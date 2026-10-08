'use client';

import { useState, useRef } from 'react';
import { submitContact } from '@/app/(public)/contact/actions';
import { Button } from '@/components/shared/ui/Button';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const formData = new FormData(e.currentTarget);
    const result = await submitContact(formData);
    
    if (result.ok) {
      setStatus('success');
      formRef.current?.reset();
    } else {
      setStatus('error');
      // Do not expose internal server/Prisma errors to users directly, provide a clean fallback.
      setErrorMsg('Failed to submit message. Please try again later.');
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
      {status === 'success' && (
        <div className="bg-[rgba(16,185,129,0.1)] border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-lg text-sm flex items-center gap-3">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Your message has been sent successfully. I will get back to you soon!
        </div>
      )}
      
      {status === 'error' && (
        <div className="bg-[rgba(239,68,68,0.1)] border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm flex items-center gap-3">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {errorMsg}
        </div>
      )}
      
      <div className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[var(--fg-base)] mb-1.5">
            Name
          </label>
          <input 
            id="name"
            name="name" 
            required 
            className="w-full bg-[rgba(255,255,255,0.03)] border border-[var(--border-color)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] rounded-lg px-4 py-2.5 text-white transition-all outline-none"
            placeholder="John Doe"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[var(--fg-base)] mb-1.5">
            Email
          </label>
          <input 
            id="email"
            type="email" 
            name="email" 
            required 
            className="w-full bg-[rgba(255,255,255,0.03)] border border-[var(--border-color)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] rounded-lg px-4 py-2.5 text-white transition-all outline-none"
            placeholder="john@example.com"
          />
        </div>
        
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-[var(--fg-base)] mb-1.5">
            Subject
          </label>
          <input 
            id="subject"
            name="subject" 
            className="w-full bg-[rgba(255,255,255,0.03)] border border-[var(--border-color)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] rounded-lg px-4 py-2.5 text-white transition-all outline-none"
            placeholder="Project Inquiry"
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-[var(--fg-base)] mb-1.5">
            Message
          </label>
          <textarea 
            id="message"
            name="message" 
            required 
            rows={5} 
            className="w-full bg-[rgba(255,255,255,0.03)] border border-[var(--border-color)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] rounded-lg px-4 py-2.5 text-white transition-all outline-none resize-none"
            placeholder="Tell me about your project..."
          ></textarea>
        </div>
      </div>
      
      <Button 
        type="submit" 
        variant="primary" 
        disabled={status === 'loading'}
        className="w-full justify-center mt-2 py-3"
      >
        {status === 'loading' ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </span>
        ) : (
          'Send Message'
        )}
      </Button>
    </form>
  );
}
