'use client';
import { useState } from 'react';

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user'|'assistant', content: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, {role: 'user', content: userMsg}]);
    setLoading(true);
    
    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          history: messages.map(m => ({
            role: m.role,
            parts: [{ text: m.content }]
          }))
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || data.error || 'API Error');
      setMessages(prev => [...prev, {role: 'assistant', content: data.answer}]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setMessages(prev => [...prev, {role: 'assistant', content: `Error: ${msg}. The AI might be unavailable.`}]);
    } finally {
      setLoading(false);
    }
  };

  if (!open) {
    return (
      <button 
        onClick={() => setOpen(true)} 
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-14 h-14 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-bright)] text-white shadow-[0_4px_24px_var(--accent-glow)] flex items-center justify-center z-[90] transition-all hover:scale-105"
        aria-label="Open AI Assistant"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-[calc(100vw-3rem)] sm:w-[400px] h-[550px] max-h-[85vh] bg-[var(--bg-elevated)] rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.1)] z-[90] flex flex-col overflow-hidden backdrop-blur-xl">
      {/* Header */}
      <div className="bg-[rgba(255,255,255,0.03)] p-4 flex justify-between items-center border-b border-[var(--border-color)] flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center text-white">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm">Portfolio Assistant</h3>
            <div className="text-[10px] text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Online
            </div>
          </div>
        </div>
        <button 
          onClick={() => setOpen(false)} 
          className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--fg-muted)] hover:text-white hover:bg-[rgba(255,255,255,0.1)] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* Messages */}
      <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="w-12 h-12 rounded-full bg-[rgba(255,255,255,0.05)] flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[var(--fg-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-white mb-1">Hi, I&apos;m Abdullah&apos;s AI.</p>
            <p className="text-xs text-[var(--fg-muted)] leading-relaxed">Ask me about his skills, experience, or specific projects.</p>
          </div>
        )}
        
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`px-4 py-2.5 rounded-2xl max-w-[85%] ${
              msg.role === 'user' 
                ? 'bg-[var(--accent)] text-white rounded-br-sm' 
                : 'bg-[rgba(255,255,255,0.06)] text-white rounded-bl-sm border border-[rgba(255,255,255,0.05)]'
            }`}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.05)] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--fg-muted)] animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--fg-muted)] animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--fg-muted)] animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>
      
      {/* Input */}
      <div className="p-4 border-t border-[var(--border-color)] bg-[rgba(0,0,0,0.2)] flex-shrink-0">
        <form onSubmit={sendMessage} className="relative flex items-center">
          <input 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            placeholder="Ask a question..." 
            className="w-full bg-[rgba(255,255,255,0.05)] border border-[var(--border-color)] rounded-xl pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-[var(--accent)] focus:bg-[rgba(255,255,255,0.08)] transition-all placeholder:text-[var(--fg-muted)]/70" 
          />
          <button 
            type="submit" 
            disabled={loading || !input.trim()} 
            className="absolute right-2 w-8 h-8 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-bright)] disabled:bg-[rgba(255,255,255,0.1)] disabled:text-[var(--fg-muted)] text-white flex items-center justify-center transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
