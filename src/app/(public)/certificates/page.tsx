import { listCertificates } from '@/lib/services/certificates';
import { CertificateCard } from '@/components/CertificateCard';
import { Section } from '@/components/shared/ui/Section';
import { Container } from '@/components/shared/ui/Container';

export const revalidate = 3600;

export const metadata = {
  title: 'Certificates — Muhammad Abdullah',
  description: 'Professional certifications and credentials.',
};

export default async function CertificatesPage() {
  const certificates = await listCertificates();

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <Section className="!pt-0">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(94,106,210,0.1)] border border-[rgba(94,106,210,0.2)] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              <span className="text-xs font-medium text-[var(--accent)] tracking-wide uppercase">Credentials</span>
            </div>
            <h1 className="heading-1 text-white mb-6">Certificates</h1>
            <p className="text-lg text-[var(--fg-muted)] leading-relaxed">
              Professional credentials, courses, and certifications showcasing continuous learning and skill development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {certificates.map(cert => (
              <CertificateCard key={cert.id} certificate={cert} />
            ))}
          </div>

          {certificates.length === 0 && (
            <div className="text-center py-24">
              <p className="text-[var(--fg-muted)]">No certificates found.</p>
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
}
