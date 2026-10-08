import React, { useState } from 'react';
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { ContactMessage } from '../data/portfolioData';
import { FadeIn } from './FadeIn';

interface ContactSectionProps {
  onSendMessage: (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => void;
  onExploreProjects: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onSendMessage,
  onExploreProjects,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    onSendMessage({
      name: formData.name,
      email: formData.email,
      subject: formData.subject || 'Direct Website Portfolio Inquiry',
      message: formData.message,
    });

    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto w-full relative">
      {/* Final CTA Banner */}
      <FadeIn delay={0.1} y={20} className="mb-16">
        <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-[#6366F1]/20 via-[#101626] to-[#22D3EE]/20 border border-[#6366F1]/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left overflow-hidden">
          <div className="flex flex-col gap-3 max-w-xl">
            <div className="inline-flex items-center justify-center md:justify-start gap-2 text-xs font-bold uppercase tracking-wider text-[#22D3EE]">
              <Sparkles className="w-4 h-4" />
              <span>Let&apos;s Build Something Great Together</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight">
              Have a Data Challenge or Machine Learning Vision?
            </h2>
            <p className="text-sm text-[#CBD5E1] leading-relaxed">
              Available for full-time engineering roles, freelance consulting, and high-impact data contracts.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href="#contact-form"
              className="px-6 py-3.5 rounded-xl font-semibold text-sm text-[#F8FAFC] bg-[#6366F1] hover:bg-[#4F46E5] shadow-lg shadow-[#6366F1]/25 transition-all"
            >
              Get In Touch
            </a>
            <button
              type="button"
              onClick={onExploreProjects}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm text-[#CBD5E1] hover:text-[#F8FAFC] bg-[#101626] border border-[#94A3B8]/20 hover:border-[#CBD5E1]/40 transition-all cursor-pointer"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </FadeIn>

      {/* Main Contact Form & Details Grid */}
      <div id="contact-form" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Info */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <FadeIn delay={0.2} y={20}>
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0B1020] border border-[#94A3B8]/15 flex flex-col gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#22D3EE]">
                  Direct Contact
                </span>
                <h3 className="text-2xl font-extrabold text-[#F8FAFC] mt-1">
                  Start a Conversation
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] mt-2 leading-relaxed">
                  Fill out the form or reach out directly via email. All inquiries receive a prompt reply within 24 hours.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#101626] border border-[#94A3B8]/15">
                  <div className="p-2.5 rounded-lg bg-[#6366F1]/15 text-[#6366F1]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] text-[#7C879B] uppercase font-semibold">Email</span>
                    <a
                      href="mailto:abdullah.aiml.eng@gmail.com"
                      className="text-xs sm:text-sm font-medium text-[#F8FAFC] hover:text-[#22D3EE] transition-colors"
                    >
                      abdullah.aiml.eng@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#101626] border border-[#94A3B8]/15">
                  <div className="p-2.5 rounded-lg bg-[#22D3EE]/15 text-[#22D3EE]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] text-[#7C879B] uppercase font-semibold">Location</span>
                    <span className="text-xs sm:text-sm font-medium text-[#F8FAFC]">
                      Remote / Global Availability
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#101626] border border-[#94A3B8]/15">
                  <div className="p-2.5 rounded-lg bg-[#22C55E]/15 text-[#22C55E]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] text-[#7C879B] uppercase font-semibold">Response Time</span>
                    <span className="text-xs sm:text-sm font-medium text-[#F8FAFC]">
                      Within 24 Hours
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Right Column: Active Interactive Form */}
        <div className="lg:col-span-7">
          <FadeIn delay={0.25} y={20}>
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0B1020] border border-[#94A3B8]/15 shadow-2xl">
              {submitted ? (
                <div className="p-8 text-center flex flex-col items-center gap-4 animate-in fade-in">
                  <div className="w-16 h-16 rounded-full bg-[#22C55E]/20 text-[#22C55E] flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#F8FAFC]">
                    Message Received!
                  </h3>
                  <p className="text-sm text-[#CBD5E1] max-w-md">
                    Thank you for reaching out, Muhammad Abdullah will review your message and reply promptly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2 rounded-xl text-xs font-semibold bg-[#101626] text-[#CBD5E1] hover:text-[#F8FAFC]"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="text-xs font-semibold text-[#CBD5E1]">
                        Your Name <span className="text-[#6366F1]">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        placeholder="e.g. Alex Henderson"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="px-4 py-3 rounded-xl bg-[#101626] border border-[#94A3B8]/20 text-sm text-[#F8FAFC] placeholder-[#7C879B] focus:outline-none focus:border-[#6366F1] transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-xs font-semibold text-[#CBD5E1]">
                        Email Address <span className="text-[#6366F1]">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="alex@company.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="px-4 py-3 rounded-xl bg-[#101626] border border-[#94A3B8]/20 text-sm text-[#F8FAFC] placeholder-[#7C879B] focus:outline-none focus:border-[#6366F1] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="subject" className="text-xs font-semibold text-[#CBD5E1]">
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      placeholder="e.g. Predictive Analytics Consulting / Full-Time Inquiry"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="px-4 py-3 rounded-xl bg-[#101626] border border-[#94A3B8]/20 text-sm text-[#F8FAFC] placeholder-[#7C879B] focus:outline-none focus:border-[#6366F1] transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-xs font-semibold text-[#CBD5E1]">
                      Your Message <span className="text-[#6366F1]">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      placeholder="Provide a brief overview of your data project, dataset, or engineering role..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="px-4 py-3 rounded-xl bg-[#101626] border border-[#94A3B8]/20 text-sm text-[#F8FAFC] placeholder-[#7C879B] focus:outline-none focus:border-[#6366F1] transition-colors resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-2 flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm text-[#F8FAFC] bg-[#6366F1] hover:bg-[#4F46E5] shadow-lg shadow-[#6366F1]/20 transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Muhammad Abdullah</span>
                  </button>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
