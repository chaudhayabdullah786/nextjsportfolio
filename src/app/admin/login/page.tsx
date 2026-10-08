'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (res.ok) {
        router.push('/admin/dashboard');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Login failed');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-deep)] p-4">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[var(--accent-glow)] rounded-full blur-[120px] opacity-20 pointer-events-none" />
      
      <div className="relative bg-[var(--bg-elevated)] border border-[var(--border-color)] p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-[var(--accent)] flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">A</div>
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
          <p className="text-sm text-[var(--fg-muted)] mt-1">Sign in to your admin panel</p>
        </div>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-[var(--fg-muted)] mb-1.5">Username</label>
            <input 
              type="text" 
              className="form-input"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              autoFocus
              placeholder="Enter username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--fg-muted)] mb-1.5">Password</label>
            <input 
              type="password" 
              className="form-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="Enter password"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary w-full py-3 rounded-lg font-medium text-white bg-[var(--accent)] hover:bg-[var(--accent-bright)] transition-colors shadow-[0_4px_14px_var(--accent-glow)] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
