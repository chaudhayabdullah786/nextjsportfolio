import type { Certificate } from '@prisma/client';

interface CertificateCardProps {
  certificate: Certificate;
}

export function CertificateCard({ certificate }: CertificateCardProps) {
  const issueDate = new Date(certificate.issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });

  return (
    <article className="group glass-panel rounded-2xl overflow-hidden border border-[var(--border-color)] hover:border-[var(--border-hover)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] flex flex-col">
      {/* Certificate image */}
      {certificate.imagePath ? (
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-[var(--bg-base)]">
          {/* eslint-disable-next-line @next/next/no-img-element -- imagePath is a dynamic DB value (legacy /uploads/* path); next/image requires statically-known domains */}
          <img
            src={certificate.imagePath}
            alt={certificate.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      ) : (
        <div className="w-full aspect-[4/3] bg-[var(--bg-base)] flex items-center justify-center">
          <svg className="w-12 h-12 text-[var(--fg-muted)] opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
      )}

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-base font-bold text-white mb-1 line-clamp-2">{certificate.title}</h3>
        <p className="text-sm text-[var(--accent)] font-medium mb-1">{certificate.platform}</p>
        <p className="text-xs text-[var(--fg-muted)] mb-4">{issueDate}</p>

        <div className="mt-auto flex flex-wrap gap-3">
          {certificate.credentialUrl && (
            <a
              href={certificate.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[var(--accent)] hover:text-white transition-colors flex items-center gap-1"
            >
              View Credential
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
          {certificate.pdfPath && (
            <a
              href={certificate.pdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[var(--fg-muted)] hover:text-white transition-colors flex items-center gap-1"
            >
              View PDF
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
