import { requireAdmin } from '@/lib/auth/requireAdmin';
import { PrismaClient } from '@prisma/client';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import MessageList from './MessageList';

const prisma = new PrismaClient();

export default async function MessagesPage({ searchParams }: { searchParams?: { page?: string } }) {
  await requireAdmin();

  const pageSize = 10;
  const pageParam = Number(searchParams?.page) || 1;
  const skip = (pageParam - 1) * pageSize;

  const [messages, totalCount, unreadCount] = await Promise.all([
    prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
      skip,
      take: pageSize,
      select: {
        id: true,
        name: true,
        email: true,
        subject: true,
        message: true,
        createdAt: true,
        isRead: true,
      },
    }),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { isRead: false } }),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div>
      <AdminPageHeader
        title="Messages"
        subtitle={`${totalCount} total${unreadCount > 0 ? ` · ${unreadCount} unread` : ''}`}
      >
        {unreadCount > 0 && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            {unreadCount} unread
          </span>
        )}
      </AdminPageHeader>

      {messages.length === 0 ? (
        <div className="bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-color)] p-12 text-center">
          <svg className="w-10 h-10 text-[var(--fg-muted)] mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <h4 className="text-lg font-semibold text-white mb-1">No messages yet</h4>
          <p className="text-sm text-[var(--fg-muted)]">Messages from your contact form will appear here.</p>
        </div>
      ) : (
        <MessageList 
          messages={messages} 
          pageParam={pageParam} 
          totalPages={totalPages} 
        />
      )}
    </div>
  );
}
