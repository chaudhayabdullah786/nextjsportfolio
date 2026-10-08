import { listClientWork } from '@/lib/services/clientWork';
import { ClientWorkCard } from '@/components/ClientWorkCard';

export default async function ClientWorkPage() {
  const works = await listClientWork({ activeOnly: true });
  
  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold mb-8 text-gradient">Client Work</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {works.map(w => (
          <ClientWorkCard key={w.id} work={w} />
        ))}
      </div>
    </div>
  );
}
