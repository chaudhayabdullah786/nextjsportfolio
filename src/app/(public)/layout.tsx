import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { AIAssistant } from '@/components/AIAssistant';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Navigation />
      <main className="flex-grow max-w-[1280px] w-full mx-auto px-6 md:px-12 py-8 md:py-16">
        {children}
      </main>
      <Footer />
      <AIAssistant />
    </div>
  );
}
