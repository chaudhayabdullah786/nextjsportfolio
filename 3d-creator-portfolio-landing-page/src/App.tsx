import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { MetricsBar } from './components/MetricsBar';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { SkillsSection } from './components/SkillsSection';
import { FeaturedProjectsSection } from './components/FeaturedProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { BlogSection } from './components/BlogSection';
import { CertificatesSection } from './components/CertificatesSection';
import { ClientWorkSection } from './components/ClientWorkSection';
import { OnlinePresenceSection } from './components/OnlinePresenceSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AiAssistant } from './components/AiAssistant';
import { AdminCMS } from './components/AdminCMS';

import {
  INITIAL_PROJECTS,
  INITIAL_SKILLS,
  INITIAL_EXPERIENCE,
  INITIAL_CERTIFICATES,
  INITIAL_BLOG_POSTS,
  INITIAL_MESSAGES,
  INITIAL_SITE_SETTINGS,
  INITIAL_CLIENT_WORK,
  ADMIN_USER,
  Project,
  Skill,
  ContactMessage,
} from './data/portfolioData';

export function App() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [skills, setSkills] = useState<Skill[]>(INITIAL_SKILLS);
  const [experience] = useState(INITIAL_EXPERIENCE);
  const [certificates] = useState(INITIAL_CERTIFICATES);
  const [blogPosts] = useState(INITIAL_BLOG_POSTS);
  const [messages, setMessages] = useState<ContactMessage[]>(INITIAL_MESSAGES);
  const [settings, setSettings] = useState(INITIAL_SITE_SETTINGS);
  const [clientWork] = useState(INITIAL_CLIENT_WORK);

  // Modal views
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  // Handlers for state updates
  const handleAddProject = (newProj: Omit<Project, 'id'>) => {
    const created: Project = {
      ...newProj,
      id: Date.now(),
    };
    setProjects((prev) => [created, ...prev]);
  };

  const handleDeleteProject = (id: number) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAddSkill = (newSkill: Omit<Skill, 'id'>) => {
    const created: Skill = {
      ...newSkill,
      id: Date.now(),
    };
    setSkills((prev) => [...prev, created]);
  };

  const handleDeleteSkill = (id: number) => {
    setSkills((prev) => prev.filter((s) => s.id !== id));
  };

  const handleUpdateSetting = (key: string, val: string) => {
    setSettings((prev) =>
      prev.map((st) => (st.key === key ? { ...st, value: val } : st))
    );
  };

  const handleSendMessage = (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => {
    const newMsg: ContactMessage = {
      ...msg,
      id: Date.now(),
      createdAt: new Date().toLocaleString([], {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'new',
    };
    setMessages((prev) => [newMsg, ...prev]);
  };

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#070A12] text-[#F8FAFC] selection:bg-[#6366F1] selection:text-white">
      {/* Fixed Navigation */}
      <Navigation
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenAssistant={() => setIsAssistantOpen(true)}
      />

      {/* Main Public Content */}
      <main>
        {/* 1. Hero Section */}
        <Hero onExploreProjects={scrollToProjects} />

        {/* 2. Real Database-Driven Metrics Bar */}
        <MetricsBar
          projectCount={projects.length}
          skillCount={skills.length}
          certificateCount={certificates.length}
          blogCount={blogPosts.length}
        />

        {/* 3. About Section */}
        <AboutSection />

        {/* 4. Services Section */}
        <ServicesSection onContactClick={scrollToContact} />

        {/* 5. Skills Preview & Matrix */}
        <SkillsSection skills={skills} />

        {/* 6. Featured Projects (16) */}
        <FeaturedProjectsSection projects={projects} />

        {/* 7. Experience (Fiverr) */}
        <ExperienceSection experienceList={experience} />

        {/* 8. Technical Blog (2 Real Posts) */}
        <BlogSection posts={blogPosts} />

        {/* 9. Certifications (9 Verified) */}
        <CertificatesSection certificates={certificates} />

        {/* 10. Client Deliverables (2 Real Records) */}
        <ClientWorkSection clientWork={clientWork} />

        {/* 11. Online Presence */}
        <OnlinePresenceSection />

        {/* 12. Final CTA & Interactive Contact Form */}
        <ContactSection
          onSendMessage={handleSendMessage}
          onExploreProjects={scrollToProjects}
        />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Interactive AI Assistant Drawer (Single Instance on Public App) */}
      <AiAssistant
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        projects={projects}
        skills={skills}
        experience={experience}
        certificates={certificates}
      />

      {/* Full-Featured Admin CMS Modal Panel */}
      <AdminCMS
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        adminUser={ADMIN_USER}
        projects={projects}
        skills={skills}
        experience={experience}
        certificates={certificates}
        blogPosts={blogPosts}
        messages={messages}
        settings={settings}
        clientWork={clientWork}
        onAddProject={handleAddProject}
        onDeleteProject={handleDeleteProject}
        onAddSkill={handleAddSkill}
        onDeleteSkill={handleDeleteSkill}
        onUpdateSetting={handleUpdateSetting}
      />
    </div>
  );
}

export default App;
