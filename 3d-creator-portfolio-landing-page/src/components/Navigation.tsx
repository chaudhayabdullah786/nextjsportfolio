import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  FileText,
  Shield,
  Sparkles,
} from 'lucide-react';

interface NavigationProps {
  onOpenAdmin: () => void;
  onOpenAssistant: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  onOpenAdmin,
  onOpenAssistant,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Blog', href: '#blog' },
    { label: 'Certifications', href: '#certificates' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-8 py-3.5 ${
        isScrolled
          ? 'glass-nav shadow-lg shadow-black/40 py-2.5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6366F1] via-[#8B5CF6] to-[#22D3EE] p-[1.5px] flex items-center justify-center transition-transform group-hover:scale-105">
            <div className="w-full h-full bg-[#070A12] rounded-[10px] flex items-center justify-center font-bold text-base text-[#F8FAFC]">
              MA
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base tracking-tight text-[#F8FAFC] group-hover:text-[#22D3EE] transition-colors">
              Abdullah<span className="text-[#6366F1]">.</span>
            </span>
            <span className="text-[10px] text-[#7C879B] -mt-1 tracking-wider uppercase font-medium">
              Data & AI / ML
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 px-5 py-2 rounded-full bg-[#0B1020]/80 border border-[#94A3B8]/15 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-medium text-[#CBD5E1] hover:text-[#22D3EE] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenAssistant}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#22D3EE] bg-[#22D3EE]/10 border border-[#22D3EE]/25 hover:bg-[#22D3EE]/20 transition-all cursor-pointer"
            title="Ask AI Assistant about Muhammad Abdullah"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Assistant</span>
          </button>

          <a
            href="/Muhammad_Abdullah_CV.pdf"
            download="Muhammad_Abdullah_CV.pdf"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#F8FAFC] bg-[#6366F1] hover:bg-[#4F46E5] shadow-md shadow-[#6366F1]/20 transition-all cursor-pointer hover:scale-102"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Download CV</span>
          </a>

          <button
            type="button"
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#7C879B] hover:text-[#CBD5E1] hover:bg-[#101626] border border-transparent hover:border-[#94A3B8]/20 transition-all cursor-pointer"
            title="Admin CMS Portal"
          >
            <Shield className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span className="hidden md:inline">Admin CMS</span>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#101626] border border-[#94A3B8]/15 text-[#F8FAFC]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 p-5 rounded-2xl bg-[#0B1020] border border-[#94A3B8]/20 shadow-2xl flex flex-col gap-3 animate-in fade-in duration-200">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#94A3B8]/15">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-xs font-medium text-[#CBD5E1] hover:text-[#22D3EE] rounded-lg hover:bg-[#101626] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-1">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAssistant();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-medium text-[#22D3EE] bg-[#22D3EE]/10 border border-[#22D3EE]/30"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask AI Portfolio Assistant</span>
            </button>

            <a
              href="/Muhammad_Abdullah_CV.pdf"
              download="Muhammad_Abdullah_CV.pdf"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold text-[#F8FAFC] bg-[#6366F1] hover:bg-[#4F46E5]"
            >
              <FileText className="w-4 h-4" />
              <span>Download CV (PDF)</span>
            </a>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="flex items-center justify-center gap-2 w-full py-2 rounded-xl text-xs font-medium text-[#7C879B] hover:text-[#F8FAFC] bg-[#101626]"
            >
              <Shield className="w-4 h-4 text-[#8B5CF6]" />
              <span>Open Admin CMS</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
