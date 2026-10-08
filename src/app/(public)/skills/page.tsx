import { listSkills } from '@/lib/services/skills';
import { SkillBar } from '@/components/SkillBar';
import { Section } from '@/components/shared/ui/Section';
import { Container } from '@/components/shared/ui/Container';
import { SectionHeading } from '@/components/shared/ui/SectionHeading';
import { GlassCard } from '@/components/shared/ui/GlassCard';

export const revalidate = 3600;

export default async function SkillsPage() {
  const skills = await listSkills();
  
  // Group skills by category if possible, or just split into two columns
  const half = Math.ceil(skills.length / 2);
  const leftSkills = skills.slice(0, half);
  const rightSkills = skills.slice(half);
  
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <Section className="!pt-0">
        <Container>
          <SectionHeading 
            title="Technical Skills" 
            subtitle="My core competencies in machine learning, data engineering, and web development."
            alignment="center"
          />
          
          <div className="mt-16 max-w-5xl mx-auto">
            <GlassCard className="p-8 md:p-12 relative overflow-hidden bg-[var(--bg-elevated)]/50 border border-[var(--border-color)]">
              
              {/* Background gradient flare */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-[var(--accent-glow)] rounded-full blur-[100px] opacity-20 pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[var(--accent-glow)] rounded-full blur-[100px] opacity-10 pointer-events-none" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-2 relative z-10">
                
                {/* Left Column */}
                <div>
                  {leftSkills.map(s => (
                    <SkillBar key={s.id} skill={s} />
                  ))}
                </div>
                
                {/* Right Column */}
                <div>
                  {rightSkills.map(s => (
                    <SkillBar key={s.id} skill={s} />
                  ))}
                </div>
                
              </div>
            </GlassCard>
          </div>
        </Container>
      </Section>
    </div>
  );
}
