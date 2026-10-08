import React from 'react';
import { HomeHero } from '@/components/home/HomeHero';
import { DeveloperSnapshot } from '@/components/home/DeveloperSnapshot';
import { AboutEditorial } from '@/components/home/AboutEditorial';
import { ExpertiseSection } from '@/components/home/ExpertiseSection';
import { SelectedWork } from '@/components/home/SelectedWork';
import { ExperienceSection } from '@/components/home/ExperienceSection';
import { EducationSection } from '@/components/home/EducationSection';
import { WritingSection } from '@/components/home/WritingSection';
import { CredentialsSection } from '@/components/home/CredentialsSection';
import { ConnectSection } from '@/components/home/ConnectSection';
import { FinalCTA } from '@/components/home/FinalCTA';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { prisma } from '@/lib/db/prisma';

export const revalidate = 3600;

export default async function HomePage() {
  const [
    projects,
    skills,
    certificates,
    posts,
    experience,
    settingsRecords
  ] = await Promise.all([
    prisma.project.findMany(),
    prisma.skill.findMany({ orderBy: { orderIndex: 'asc' } }),
    prisma.certificate.findMany(),
    prisma.blogPost.findMany(),
    prisma.experience.findMany({ orderBy: { startDate: 'desc' } }),
    prisma.siteSettings.findMany()
  ]);

  const settings = settingsRecords.reduce((acc, s) => {
    acc[s.key] = s.value || '';
    return acc;
  }, {} as Record<string, string>);

  return (
    <>
      <Navigation />
      <main className="flex min-h-screen flex-col bg-[#070A12] text-white overflow-x-hidden">
        <HomeHero projectCount={projects.length} certCount={certificates.length} />
        <DeveloperSnapshot
          projectCount={projects.length}
          skillCount={skills.length}
          certCount={certificates.length}
          blogCount={posts.length}
          skills={skills}
          settings={settings}
        />
        <AboutEditorial />
        <ExpertiseSection skills={skills} />
        <SelectedWork projects={projects} />
        <ExperienceSection experience={experience} />
        <EducationSection />
        <WritingSection posts={posts} />
        <CredentialsSection certs={certificates} />
        <ConnectSection settings={settings} />
        <FinalCTA />
      </main>
      <Footer settings={settings} />
    </>
  );
}
