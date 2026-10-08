import React from 'react';
import {
  FileText,
  ArrowRight,
  Mail,
  CheckCircle2,
  Database,
  BrainCircuit,
  Award,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { FadeIn } from './FadeIn';

interface HeroProps {
  onExploreProjects: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreProjects }) => {
  const techPills = [
    'Python',
    'PyTorch & Scikit-Learn',
    'PostgreSQL',
    'Power BI',
    'FastAPI & REST',
    'Time Series & Forecasting',
  ];

  return (
    <section className="relative min-h-[92vh] pt-28 pb-16 px-4 sm:px-8 flex items-center bg-grid-pattern overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 ambient-glow-indigo rounded-full pointer-events-none blur-3xl opacity-60" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/3 translate-y-1/3 w-96 h-96 ambient-glow-cyan rounded-full pointer-events-none blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Column: Text & Intro */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6">
          {/* Availability Status Badge */}
          <FadeIn delay={0.05} y={-10}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101626] border border-[#22C55E]/30 text-xs font-medium text-[#22C55E] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
              <span>Available for Select Contracts &amp; Full-Time Roles</span>
            </div>
          </FadeIn>

          {/* Intro & Name */}
          <FadeIn delay={0.15} y={20}>
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold tracking-wider uppercase text-[#22D3EE]">
                Hi, I&apos;m
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#F8FAFC] leading-[1.08]">
                Muhammad <br />
                <span className="bg-gradient-to-r from-[#6366F1] via-[#A855F7] to-[#22D3EE] bg-clip-text text-transparent">
                  Abdullah
                </span>
              </h1>
            </div>
          </FadeIn>

          {/* Professional Role */}
          <FadeIn delay={0.25} y={20}>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#CBD5E1] tracking-tight flex items-center gap-2">
              <BrainCircuit className="w-6 h-6 text-[#6366F1]" />
              Data Analyst &amp; AI/ML Engineer
            </h2>
          </FadeIn>

          {/* Real Stored Bio Summary */}
          <FadeIn delay={0.35} y={20}>
            <p className="text-sm sm:text-base leading-relaxed text-[#94A3B8] max-w-2xl font-normal">
              Specializing in extracting actionable business intelligence, building scalable
              machine learning predictive systems, architecting end-to-end data pipelines,
              and delivering interactive executive analytics dashboards. Experienced with 
              production Python, Scikit-Learn, PyTorch, SQL, and enterprise Power BI suites.
            </p>
          </FadeIn>

          {/* Technology Badges */}
          <FadeIn delay={0.45} y={20}>
            <div className="flex flex-wrap gap-2 pt-1">
              {techPills.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-md text-xs font-medium bg-[#101626] border border-[#94A3B8]/20 text-[#CBD5E1]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </FadeIn>

          {/* Action CTAs */}
          <FadeIn delay={0.55} y={20}>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={onExploreProjects}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-[#F8FAFC] bg-[#6366F1] hover:bg-[#4F46E5] shadow-lg shadow-[#6366F1]/25 hover:shadow-indigo-500/40 transition-all cursor-pointer hover:scale-102 active:scale-98"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="/Muhammad_Abdullah_CV.pdf"
                download="Muhammad_Abdullah_CV.pdf"
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm text-[#CBD5E1] hover:text-[#F8FAFC] bg-[#101626] border border-[#94A3B8]/25 hover:border-[#6366F1]/60 transition-all cursor-pointer hover:scale-102"
              >
                <FileText className="w-4 h-4 text-[#22D3EE]" />
                <span>Download CV</span>
              </a>
            </div>
          </FadeIn>

          {/* Verified Social Links */}
          <FadeIn delay={0.65} y={20}>
            <div className="flex items-center gap-4 pt-2 text-[#7C879B]">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#7C879B]">
                Connect:
              </span>
              <a
                href="https://github.com/muhammad-abdullah-ai"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-[#101626] border border-[#94A3B8]/15 text-[#CBD5E1] hover:text-[#22D3EE] hover:border-[#22D3EE]/40 transition-all"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/muhammad-abdullah-aiml"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-[#101626] border border-[#94A3B8]/15 text-[#CBD5E1] hover:text-[#6366F1] hover:border-[#6366F1]/40 transition-all"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="mailto:abdullah.aiml.eng@gmail.com"
                className="p-2 rounded-lg bg-[#101626] border border-[#94A3B8]/15 text-[#CBD5E1] hover:text-[#A855F7] hover:border-[#A855F7]/40 transition-all"
                title="Email Direct"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </FadeIn>
        </div>

        {/* Right Column: Real Portrait & Verified Real DB Metrics */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
          <FadeIn delay={0.3} y={30} className="relative w-full max-w-[380px] sm:max-w-[420px]">
            {/* Ambient halo behind portrait */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#6366F1]/30 via-[#A855F7]/20 to-[#22D3EE]/30 rounded-3xl blur-2xl transform -rotate-1 scale-105" />

            {/* Portrait Frame */}
            <div className="relative rounded-3xl p-2 bg-gradient-to-b from-[#6366F1]/40 via-[#101626] to-[#22D3EE]/30 border border-[#94A3B8]/20 shadow-2xl overflow-visible">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-[#0B1020]">
                <img
                  src="/images/profile/portfolio-profile.jpg"
                  alt="Muhammad Abdullah - Data Analyst & AI/ML Engineer"
                  className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-103"
                  loading="eager"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
                  }}
                />

                {/* Subtitle tag at bottom of frame */}
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[#070A12] via-[#070A12]/80 to-transparent">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#22D3EE]" />
                    <span className="text-xs font-semibold text-[#F8FAFC]">
                      Muhammad Abdullah
                    </span>
                  </div>
                  <p className="text-[11px] text-[#CBD5E1]/80 mt-0.5">
                    Data Analyst &amp; AI/ML Engineer
                  </p>
                </div>
              </div>

              {/* Floating Real Metric Card: 16 Projects */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 px-4 py-2.5 rounded-xl bg-[#0B1020]/95 border border-[#6366F1]/40 shadow-xl backdrop-blur-md flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#6366F1]/20 flex items-center justify-center text-[#6366F1]">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-base font-bold text-[#F8FAFC]">16 Real Projects</div>
                  <div className="text-[11px] text-[#7C879B]">Production ML &amp; Analytics</div>
                </div>
              </div>

              {/* Floating Real Metric Card: 9 Certs */}
              <div className="absolute -top-4 -right-4 sm:-right-6 px-4 py-2.5 rounded-xl bg-[#0B1020]/95 border border-[#22D3EE]/40 shadow-xl backdrop-blur-md flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#22D3EE]/20 flex items-center justify-center text-[#22D3EE]">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-base font-bold text-[#F8FAFC]">9 Certifications</div>
                  <div className="text-[11px] text-[#7C879B]">DeepLearning.AI &amp; IBM</div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default Hero;
