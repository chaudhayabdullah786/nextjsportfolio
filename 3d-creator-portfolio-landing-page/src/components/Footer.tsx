import React from 'react';
import { ArrowUp, Heart, Shield } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#94A3B8]/15 bg-[#05070D] pt-16 pb-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366F1] to-[#22D3EE] p-[1.5px] flex items-center justify-center">
                <div className="w-full h-full bg-[#070A12] rounded-[6px] flex items-center justify-center font-bold text-xs text-[#F8FAFC]">
                  MA
                </div>
              </div>
              <span className="font-bold text-lg text-[#F8FAFC]">
                Muhammad Abdullah<span className="text-[#6366F1]">.</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#7C879B] max-w-sm leading-relaxed">
              Data Analyst &amp; AI/ML Engineer focused on extracting actionable intelligence, building scalable machine learning systems, predictive modeling, and data pipelines.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/muhammad-abdullah-ai"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-[#101626] border border-[#94A3B8]/15 text-[#CBD5E1] hover:text-[#22D3EE] transition-colors"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/muhammad-abdullah-aiml"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-[#101626] border border-[#94A3B8]/15 text-[#CBD5E1] hover:text-[#6366F1] transition-colors"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F8FAFC]">
              Explore
            </span>
            <div className="flex flex-col gap-2 text-xs text-[#94A3B8]">
              <a href="#about" className="hover:text-[#22D3EE] transition-colors">About Muhammad Abdullah</a>
              <a href="#services" className="hover:text-[#22D3EE] transition-colors">Services &amp; Capabilities</a>
              <a href="#skills" className="hover:text-[#22D3EE] transition-colors">Skill Matrix (22)</a>
              <a href="#projects" className="hover:text-[#22D3EE] transition-colors">Projects (16)</a>
              <a href="#experience" className="hover:text-[#22D3EE] transition-colors">Fiverr Experience</a>
            </div>
          </div>

          {/* Credentials & Resources */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F8FAFC]">
              Credentials &amp; Portal
            </span>
            <div className="flex flex-col gap-2 text-xs text-[#94A3B8]">
              <a href="#certificates" className="hover:text-[#22D3EE] transition-colors">
                9 Professional Certifications
              </a>
              <a href="#blog" className="hover:text-[#22D3EE] transition-colors">
                2 Engineering Articles
              </a>
              <a
                href="/Muhammad_Abdullah_CV.pdf"
                download="Muhammad_Abdullah_CV.pdf"
                className="text-[#6366F1] hover:text-[#22D3EE] transition-colors font-medium"
              >
                Download Muhammad_Abdullah_CV.pdf
              </a>
              <button
                type="button"
                onClick={onOpenAdmin}
                className="text-left text-[#7C879B] hover:text-[#CBD5E1] transition-colors flex items-center gap-1.5 pt-2"
              >
                <Shield className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span>Protected Admin CMS Dashboard</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#94A3B8]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7C879B]">
          <div className="flex items-center gap-1">
            <span>&copy; {new Date().getFullYear()} Muhammad Abdullah. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Built with precision <Heart className="w-3 h-3 text-[#EF4444]" /> &amp; verified data
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1 text-[#CBD5E1] hover:text-[#F8FAFC] transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
