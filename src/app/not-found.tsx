import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative bg-[var(--color-bg)] text-white">
      <h1 className="text-6xl font-bold text-gradient mb-4">404</h1>
      <h2 className="text-2xl mb-8">Page Not Found</h2>
      <p className="text-[var(--color-text-muted)] mb-8">The page you are looking for does not exist or has been moved.</p>
      <Link href="/" className="btn btn-primary">Return Home</Link>
    </div>
  );
}
