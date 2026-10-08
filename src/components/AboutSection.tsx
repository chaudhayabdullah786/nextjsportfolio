import Link from 'next/link';
import { Section } from './shared/ui/Section';
import { Container } from './shared/ui/Container';
import { Button } from './shared/ui/Button';
import { SectionHeading } from './shared/ui/SectionHeading';

export function AboutSection() {
  return (
    <Section id="about" className="bg-[var(--bg-elevated)]/30 border-y border-[var(--border-color)]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* LEFT: Story & Intro (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <SectionHeading 
              title="About Me" 
              subtitle="Bridging the gap between data science and scalable engineering."
              eyebrow="My Story"
              className="!text-left !items-start"
            />
            
            <div className="mt-8 space-y-6 text-[17px] text-[var(--fg-muted)] leading-relaxed">
              <p>
                I am a passionate Data Analyst and AI/ML Engineer with a strong foundation in building end-to-end data pipelines, predictive models, and intuitive user interfaces. My journey began with a deep curiosity for how data shapes decisions, leading me to master both analytical tools and full-stack development.
              </p>
              <p>
                By combining Python-driven machine learning ecosystems with modern web frameworks like React and Next.js, I deliver holistic solutions. I don&apos;t just build models; I build the infrastructure, APIs, and interfaces that bring those models to users.
              </p>
              <p>
                Currently, I am focused on expanding my expertise in Generative AI, MLOps, and cloud architectures, while actively seeking opportunities to tackle challenging problems in a collaborative environment.
              </p>
            </div>
            
            <div className="mt-10">
              <Button asChild variant="secondary" size="lg" className="rounded-full px-8 font-medium">
                <Link href="/about">
                  More About Me
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </Button>
            </div>
          </div>
          
          {/* RIGHT: Value Props (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            
            <div className="glass-panel p-6 rounded-2xl flex gap-4 items-start border border-[var(--border-color)]">
              <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center shrink-0 mt-1">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h4 className="text-[16px] font-bold text-white mb-1.5">Data-Driven Focus</h4>
                <p className="text-[14px] text-[var(--fg-muted)] leading-relaxed">Extracting maximum value from structured and unstructured data to guide strategic decisions.</p>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl flex gap-4 items-start border border-[var(--border-color)]">
              <div className="w-12 h-12 rounded-xl bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)] flex items-center justify-center shrink-0 mt-1">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div>
                <h4 className="text-[16px] font-bold text-white mb-1.5">Full-Stack Capability</h4>
                <p className="text-[14px] text-[var(--fg-muted)] leading-relaxed">Handling the complete pipeline from robust backend APIs to responsive frontend interfaces.</p>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl flex gap-4 items-start border border-[var(--border-color)]">
              <div className="w-12 h-12 rounded-xl bg-[var(--accent-purple)]/10 text-[var(--accent-purple)] flex items-center justify-center shrink-0 mt-1">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div>
                <h4 className="text-[16px] font-bold text-white mb-1.5">Intelligent Solutions</h4>
                <p className="text-[14px] text-[var(--fg-muted)] leading-relaxed">Integrating machine learning models natively into production-ready software systems.</p>
              </div>
            </div>

          </div>

        </div>
      </Container>
    </Section>
  );
}
