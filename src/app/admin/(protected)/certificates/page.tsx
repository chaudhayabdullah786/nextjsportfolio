import { listCertificates } from '@/lib/services/certificates';
import Link from 'next/link';
import { requireAdmin } from '@/lib/auth/requireAdmin';
import DeleteForm from '@/components/admin/DeleteForm';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { deleteCertificateAction } from './actions';

export default async function AdminCertificates() {
  await requireAdmin();
  const items = await listCertificates();

  return (
    <div>
      <AdminPageHeader
        title="Certificates"
        subtitle="Manage professional certificates, credentials and associated media."
        actionLabel="Add Certificate"
        actionHref="/admin/certificates/new"
      />

      {/* Desktop Table */}
      <div className="hidden md:block bg-[var(--bg-elevated)] rounded-2xl border border-[var(--border-color)] overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[var(--bg-base)] border-b border-[var(--border-color)]">
              <th className="px-5 py-3.5 font-semibold text-[10px] text-[var(--fg-muted)] uppercase tracking-widest">Certificate</th>
              <th className="px-5 py-3.5 font-semibold text-[10px] text-[var(--fg-muted)] uppercase tracking-widest w-[180px]">Platform</th>
              <th className="px-5 py-3.5 font-semibold text-[10px] text-[var(--fg-muted)] uppercase tracking-widest w-[120px]">Date</th>
              <th className="px-5 py-3.5 font-semibold text-[10px] text-[var(--fg-muted)] uppercase tracking-widest w-[130px]">Files</th>
              <th className="px-5 py-3.5 font-semibold text-[10px] text-[var(--fg-muted)] uppercase tracking-widest w-[140px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-b border-[var(--border-color)] last:border-0 hover:bg-[rgba(255,255,255,0.02)] transition-colors" style={{ height: '72px' }}>
                {/* Certificate: 4:3 thumbnail + title beside it */}
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    {/* 4:3 rectangle: 56×42px */}
                    <div className="w-[56px] h-[42px] rounded-lg overflow-hidden bg-[rgba(255,255,255,0.04)] border border-[var(--border-color)] flex-shrink-0">
                      {item.imagePath ? (
                        // eslint-disable-next-line @next/next/no-img-element -- cert thumbnails come from legacy /uploads/* paths
                        <img
                          src={`/${item.imagePath}`}
                          alt=""
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-[var(--fg-muted)] opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <span className="font-medium text-white text-sm line-clamp-2 max-w-[240px]">{item.title}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-sm text-[var(--fg-muted)]">{item.platform}</td>
                <td className="px-5 py-3.5 text-sm text-[var(--fg-muted)] whitespace-nowrap">
                  {new Date(item.issueDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex gap-2 flex-wrap">
                    {item.imagePath && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[rgba(94,106,210,0.12)] text-[var(--accent)] border border-[rgba(94,106,210,0.2)]">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        Image
                      </span>
                    )}
                    {item.pdfPath && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        PDF
                      </span>
                    )}
                    {!item.imagePath && !item.pdfPath && (
                      <span className="text-xs text-[var(--fg-muted)]/40">—</span>
                    )}
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/certificates/${item.id}/edit`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[var(--fg-muted)] bg-[rgba(255,255,255,0.04)] border border-[var(--border-color)] hover:text-white hover:bg-[rgba(255,255,255,0.07)] hover:border-[var(--border-hover)] transition-all"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </Link>
                    <DeleteForm action={deleteCertificateAction} id={item.id} />
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-16 text-center">
                  <div className="flex flex-col items-center gap-3 text-[var(--fg-muted)]">
                    <svg className="w-10 h-10 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    <p className="text-sm">No certificates yet. Add your first certificate.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Table footer */}
        <div className="px-5 py-3 border-t border-[var(--border-color)] bg-[var(--bg-base)]">
          <p className="text-xs text-[var(--fg-muted)]">Showing {items.length} certificate{items.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {/* Mobile card view */}
      <div className="md:hidden flex flex-col gap-3">
        {items.map(item => (
          <div key={item.id} className="bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-color)] p-4 flex gap-3">
            {item.imagePath ? (
              <div className="w-[56px] h-[42px] rounded-lg overflow-hidden bg-[rgba(255,255,255,0.04)] border border-[var(--border-color)] flex-shrink-0 mt-0.5">
                {/* eslint-disable-next-line @next/next/no-img-element -- cert thumbnails use legacy /uploads/* paths */}
                <img src={`/${item.imagePath}`} alt="" className="w-full h-full object-cover" loading="lazy" />
              </div>
            ) : (
              <div className="w-[56px] h-[42px] rounded-lg bg-[rgba(255,255,255,0.04)] border border-[var(--border-color)] flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-5 h-5 text-[var(--fg-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white text-sm line-clamp-2 mb-1">{item.title}</h3>
              <p className="text-xs text-[var(--fg-muted)] mb-2">{item.platform} · {new Date(item.issueDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
              <div className="flex gap-2 items-center">
                <Link href={`/admin/certificates/${item.id}/edit`} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[var(--fg-muted)] bg-[rgba(255,255,255,0.04)] border border-[var(--border-color)] hover:text-white transition-all">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </Link>
                <DeleteForm action={deleteCertificateAction} id={item.id} />
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <div className="p-8 text-center text-sm text-[var(--fg-muted)]">No certificates found.</div>}
      </div>
    </div>
  );
}
