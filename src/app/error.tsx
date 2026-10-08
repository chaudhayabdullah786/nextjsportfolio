'use client';
import { useEffect } from 'react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-[var(--color-bg)] text-white">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-[var(--color-text-muted)] mb-8">An unexpected error occurred.</p>
      <button
        onClick={() => reset()}
        className="btn btn-primary"
      >
        Try again
      </button>
    </div>
  );
}
