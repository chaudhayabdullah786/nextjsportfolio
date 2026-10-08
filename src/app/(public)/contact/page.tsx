import { ContactForm } from '@/components/ContactForm';
import { Section } from '@/components/shared/ui/Section';
import { Container } from '@/components/shared/ui/Container';
import { getSettings } from '@/lib/services/settings';

export const revalidate = 3600;

export const metadata = {
  title: 'Contact — Muhammad Abdullah',
  description: 'Get in touch for collaborations, projects, or inquiries.',
};

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <Section className="!pt-0">
        <Container>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start max-w-6xl mx-auto">
            
            {/* Left side: Content & Info */}
            <div className="lg:sticky lg:top-32">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(94,106,210,0.1)] border border-[rgba(94,106,210,0.2)] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                <span className="text-xs font-medium text-[var(--accent)] tracking-wide uppercase">Get in touch</span>
              </div>
              <h1 className="heading-1 text-white mb-6">Let&apos;s work together.</h1>
              <p className="text-lg text-[var(--fg-muted)] leading-relaxed mb-12 max-w-lg">
                I&apos;m currently available for freelance work and full-time roles. If you have a project that needs some data magic or solid engineering, I&apos;d love to hear about it.
              </p>

              <div className="space-y-8">
                {/* Email */}
                {settings.contact_email && (
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[rgba(94,106,210,0.1)] border border-[rgba(94,106,210,0.2)] flex items-center justify-center">
                      <svg className="w-5 h-5 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[var(--fg-muted)] uppercase tracking-wider mb-1">Email</div>
                      <a href={`mailto:${settings.contact_email}`} className="text-lg font-medium text-white hover:text-[var(--accent)] transition-colors">
                        {settings.contact_email}
                      </a>
                    </div>
                  </div>
                )}

                {/* GitHub */}
                {settings.github_url && (
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[rgba(94,106,210,0.1)] border border-[rgba(94,106,210,0.2)] flex items-center justify-center">
                      <svg className="w-5 h-5 text-[var(--accent)]" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[var(--fg-muted)] uppercase tracking-wider mb-1">GitHub</div>
                      <a href={settings.github_url} target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-white hover:text-[var(--accent)] transition-colors">
                        Follow my work
                      </a>
                    </div>
                  </div>
                )}

                {/* LinkedIn */}
                {settings.linkedin_url && (
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[rgba(94,106,210,0.1)] border border-[rgba(94,106,210,0.2)] flex items-center justify-center">
                      <svg className="w-5 h-5 text-[var(--accent)]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[var(--fg-muted)] uppercase tracking-wider mb-1">LinkedIn</div>
                      <a href={settings.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-white hover:text-[var(--accent)] transition-colors">
                        Connect with me
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right side: Contact Form */}
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-[var(--border-color)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent-glow)] rounded-full blur-[100px] opacity-10 pointer-events-none" />
              <ContactForm />
            </div>

          </div>

        </Container>
      </Section>
    </div>
  );
}
