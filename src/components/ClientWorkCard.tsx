import type { ClientWork } from '@prisma/client';

export function ClientWorkCard({ work }: { work: ClientWork }) {
  const clientLabel = work.showClientName ? work.clientName : work.publicClientLabel;
  return (
    <div className="card p-4">
      {work.thumbnailPath && (
        // eslint-disable-next-line @next/next/no-img-element -- thumbnailPath is a dynamic DB value
        <img src={work.thumbnailPath} alt={work.title} className="w-full h-40 object-cover rounded-md mb-4" />
      )}
      <h3 className="text-xl font-bold mb-1">{work.title}</h3>
      {clientLabel && <h4 className="text-[var(--color-primary)] mb-2">{clientLabel}</h4>}
      <p className="text-[var(--color-text-muted)] mb-4">{work.shortDescription}</p>
      
      <div className="flex gap-4">
        {work.videoUrl && <a href={work.videoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">Watch Video</a>}
        {work.videoPath && !work.videoUrl && <a href={work.videoPath} target="_blank" rel="noopener noreferrer" className="btn btn-outline">Watch Local Video</a>}
        {work.projectUrl && <a href={work.projectUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline self-center">Visit Project</a>}
      </div>
    </div>
  );
}
