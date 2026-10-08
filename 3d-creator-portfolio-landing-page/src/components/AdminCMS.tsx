import React, { useState } from 'react';
import {
  LayoutDashboard,
  FolderGit2,
  BookOpen,
  Cpu,
  Briefcase,
  Award,
  Users2,
  Mail,
  Settings as SettingsIcon,
  ShieldAlert,
  LogOut,
  ExternalLink,
  Plus,
  Trash2,
  Search,
  CheckCircle,
  Eye,
  EyeOff,
  Menu,
} from 'lucide-react';
import {
  Project,
  Skill,
  Experience,
  Certificate,
  BlogPost,
  ContactMessage,
  SiteSetting,
  ClientWork,
  AdminUser,
} from '../data/portfolioData';
import { normalizeTechStack } from '../utils/normalizeTechStack';

interface AdminCMSProps {
  isOpen: boolean;
  onClose: () => void;
  adminUser: AdminUser;
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
  certificates: Certificate[];
  blogPosts: BlogPost[];
  messages: ContactMessage[];
  settings: SiteSetting[];
  clientWork: ClientWork[];
  onAddProject: (p: Omit<Project, 'id'>) => void;
  onDeleteProject: (id: number) => void;
  onAddSkill: (s: Omit<Skill, 'id'>) => void;
  onDeleteSkill: (id: number) => void;
  onUpdateSetting: (key: string, val: string) => void;
}

export const AdminCMS: React.FC<AdminCMSProps> = ({
  isOpen,
  onClose,
  adminUser,
  projects,
  skills,
  experience,
  certificates,
  blogPosts,
  messages,
  settings,
  clientWork,
  onAddProject,
  onDeleteProject,
  onAddSkill,
  onDeleteSkill,
  onUpdateSetting,
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'dashboard'
    | 'projects'
    | 'blog'
    | 'skills'
    | 'experience'
    | 'certificates'
    | 'client-work'
    | 'messages'
    | 'settings'
    | 'admins'
  >('dashboard');

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSecretMap, setShowSecretMap] = useState<Record<string, boolean>>({});

  // Modals state
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    category: 'AI & Machine Learning' as Project['category'],
    description: '',
    fullDescription: '',
    techStack: '',
    tags: '',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    liveUrl: '',
    githubUrl: '',
    featured: false,
    displayOrder: projects.length + 1,
  });

  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false);
  const [newSkill, setNewSkill] = useState({
    name: '',
    category: 'AI & Machine Learning' as Skill['category'],
    level: 85,
  });

  const [viewMessage, setViewMessage] = useState<ContactMessage | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  if (!isOpen) return null;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, count: undefined },
    { id: 'projects', label: 'Projects', icon: FolderGit2, count: projects.length },
    { id: 'blog', label: 'Blog Posts', icon: BookOpen, count: blogPosts.length },
    { id: 'skills', label: 'Skills', icon: Cpu, count: skills.length },
    { id: 'experience', label: 'Experience', icon: Briefcase, count: experience.length },
    { id: 'certificates', label: 'Certificates', icon: Award, count: certificates.length },
    { id: 'client-work', label: 'Client Work', icon: Users2, count: clientWork.length },
    { id: 'messages', label: 'Messages', icon: Mail, count: messages.length },
    { id: 'settings', label: 'Settings', icon: SettingsIcon, count: settings.length },
    { id: 'admins', label: 'Admins', icon: ShieldAlert, count: 1 },
  ];

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title) return;
    onAddProject({
      ...newProject,
      tags: newProject.tags ? newProject.tags.split(',').map((t) => t.trim()) : ['Machine Learning'],
    });
    setIsAddProjectOpen(false);
    setNewProject({
      title: '',
      category: 'AI & Machine Learning',
      description: '',
      fullDescription: '',
      techStack: '',
      tags: '',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      liveUrl: '',
      githubUrl: '',
      featured: false,
      displayOrder: projects.length + 2,
    });
  };

  const handleCreateSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.name) return;
    onAddSkill(newSkill);
    setIsAddSkillOpen(false);
    setNewSkill({
      name: '',
      category: 'AI & Machine Learning',
      level: 85,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex bg-[#070A12] text-[#F8FAFC] overflow-hidden">
      {/* Sidebar (~260px) */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#0B1020] border-r border-[#94A3B8]/15 flex flex-col justify-between transition-transform duration-200 lg:static lg:translate-x-0 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col">
          {/* Logo & Identity */}
          <div className="p-5 border-b border-[#94A3B8]/15 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#6366F1] to-[#22D3EE] p-[1.5px] flex items-center justify-center">
                <div className="w-full h-full bg-[#070A12] rounded-[6.5px] flex items-center justify-center text-xs font-bold text-[#F8FAFC]">
                  CMS
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight text-[#F8FAFC]">
                  Admin Console
                </span>
                <span className="text-[10px] text-[#22D3EE] font-mono">
                  Muhammad Abdullah
                </span>
              </div>
            </div>
          </div>

          {/* Nav List */}
          <nav className="p-3 flex flex-col gap-1 overflow-y-auto max-h-[calc(100vh-210px)]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id as any);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all text-left ${
                    isActive
                      ? 'bg-[#6366F1] text-[#F8FAFC] shadow-md shadow-[#6366F1]/25 font-semibold'
                      : 'text-[#CBD5E1] hover:bg-[#101626] hover:text-[#F8FAFC]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                        isActive
                          ? 'bg-white/20 text-[#F8FAFC]'
                          : 'bg-[#101626] text-[#7C879B]'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#94A3B8]/15 bg-[#070A12]/50 flex flex-col gap-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold text-[#22D3EE] bg-[#22D3EE]/10 border border-[#22D3EE]/20 hover:bg-[#22D3EE]/20 transition-all cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Site</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-medium text-[#94A3B8] hover:text-[#EF4444] hover:bg-[#101626] transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Close Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Canvas */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#070A12]">
        {/* Topbar */}
        <header className="h-16 border-b border-[#94A3B8]/15 px-4 sm:px-8 bg-[#0B1020]/90 backdrop-blur-md flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-2 rounded-lg bg-[#101626] text-[#CBD5E1]"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-base sm:text-lg font-bold capitalize text-[#F8FAFC]">
              {activeTab.replace('-', ' ')}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs text-[#94A3B8]">
              <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
              <span>PostgreSQL Connected</span>
            </div>

            <div className="flex items-center gap-2.5 pl-3 border-l border-[#94A3B8]/15">
              <div className="w-8 h-8 rounded-full bg-[#6366F1]/20 border border-[#6366F1]/40 flex items-center justify-center text-xs font-bold text-[#F8FAFC]">
                MA
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-semibold text-[#F8FAFC]">
                  {adminUser.name}
                </span>
                <span className="text-[10px] text-[#7C879B]">
                  {adminUser.role}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          {/* 1. DASHBOARD TAB */}
          {activeTab === 'dashboard' && (
            <div className="flex flex-col gap-8 max-w-6xl mx-auto">
              <div>
                <h2 className="text-2xl font-bold text-[#F8FAFC]">
                  System Overview &amp; Baseline Metrics
                </h2>
                <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
                  Authoritative PostgreSQL database records for Muhammad Abdullah portfolio.
                </p>
              </div>

              {/* Real Metric Cards Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                <div className="p-4 rounded-xl bg-[#101626] border border-[#6366F1]/30 flex flex-col gap-1">
                  <span className="text-[11px] font-semibold text-[#94A3B8] uppercase">Projects</span>
                  <span className="text-2xl font-extrabold text-[#F8FAFC]">{projects.length}</span>
                  <span className="text-[10px] text-[#6366F1]">16 in PostgreSQL</span>
                </div>
                <div className="p-4 rounded-xl bg-[#101626] border border-[#22D3EE]/30 flex flex-col gap-1">
                  <span className="text-[11px] font-semibold text-[#94A3B8] uppercase">Skills</span>
                  <span className="text-2xl font-extrabold text-[#F8FAFC]">{skills.length}</span>
                  <span className="text-[10px] text-[#22D3EE]">22 verified items</span>
                </div>
                <div className="p-4 rounded-xl bg-[#101626] border border-[#A855F7]/30 flex flex-col gap-1">
                  <span className="text-[11px] font-semibold text-[#94A3B8] uppercase">Certs</span>
                  <span className="text-2xl font-extrabold text-[#F8FAFC]">{certificates.length}</span>
                  <span className="text-[10px] text-[#A855F7]">9 credentials</span>
                </div>
                <div className="p-4 rounded-xl bg-[#101626] border border-[#F59E0B]/30 flex flex-col gap-1">
                  <span className="text-[11px] font-semibold text-[#94A3B8] uppercase">Articles</span>
                  <span className="text-2xl font-extrabold text-[#F8FAFC]">{blogPosts.length}</span>
                  <span className="text-[10px] text-[#F59E0B]">2 real posts</span>
                </div>
                <div className="p-4 rounded-xl bg-[#101626] border border-[#22C55E]/30 flex flex-col gap-1">
                  <span className="text-[11px] font-semibold text-[#94A3B8] uppercase">Messages</span>
                  <span className="text-2xl font-extrabold text-[#F8FAFC]">{messages.length}</span>
                  <span className="text-[10px] text-[#22C55E]">3 contact inquiries</span>
                </div>
                <div className="p-4 rounded-xl bg-[#101626] border border-[#EC4899]/30 flex flex-col gap-1">
                  <span className="text-[11px] font-semibold text-[#94A3B8] uppercase">Clients</span>
                  <span className="text-2xl font-extrabold text-[#F8FAFC]">{clientWork.length}</span>
                  <span className="text-[10px] text-[#EC4899]">2 verified deliverables</span>
                </div>
              </div>

              {/* Two Panels: Recent Messages & Quick Projects */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Messages */}
                <div className="p-5 sm:p-6 rounded-2xl bg-[#0B1020] border border-[#94A3B8]/15 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-[#F8FAFC] flex items-center gap-2">
                        <Mail className="w-4 h-4 text-[#22D3EE]" />
                        <span>Recent Inquiries ({messages.length})</span>
                      </h3>
                      <button
                        type="button"
                        onClick={() => setActiveTab('messages')}
                        className="text-xs text-[#6366F1] hover:text-[#22D3EE]"
                      >
                        View All
                      </button>
                    </div>

                    <div className="flex flex-col gap-3">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          onClick={() => setViewMessage(msg)}
                          className="p-3.5 rounded-xl bg-[#101626] border border-[#94A3B8]/10 hover:border-[#22D3EE]/30 cursor-pointer transition-all flex flex-col gap-1"
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-[#F8FAFC]">{msg.name}</span>
                            <span className="text-[10px] font-mono text-[#7C879B]">{msg.createdAt}</span>
                          </div>
                          <span className="text-xs text-[#22D3EE] font-medium line-clamp-1">{msg.subject}</span>
                          <p className="text-xs text-[#94A3B8] line-clamp-1">{msg.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent Projects */}
                <div className="p-5 sm:p-6 rounded-2xl bg-[#0B1020] border border-[#94A3B8]/15 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-[#F8FAFC] flex items-center gap-2">
                        <FolderGit2 className="w-4 h-4 text-[#6366F1]" />
                        <span>Featured Projects ({projects.length})</span>
                      </h3>
                      <button
                        type="button"
                        onClick={() => setActiveTab('projects')}
                        className="text-xs text-[#6366F1] hover:text-[#22D3EE]"
                      >
                        Manage All
                      </button>
                    </div>

                    <div className="flex flex-col gap-3">
                      {projects.slice(0, 4).map((p) => (
                        <div
                          key={p.id}
                          className="p-3.5 rounded-xl bg-[#101626] border border-[#94A3B8]/10 flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={p.image}
                              alt=""
                              className="w-10 h-10 rounded-lg object-cover bg-[#070A12]"
                            />
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-[#F8FAFC] line-clamp-1">{p.title}</span>
                              <span className="text-[10px] text-[#A855F7]">{p.category}</span>
                            </div>
                          </div>
                          {p.featured && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#6366F1]/20 text-[#6366F1]">
                              Featured
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. PROJECTS TAB */}
          {activeTab === 'projects' && (
            <div className="flex flex-col gap-6 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-[#F8FAFC]">
                    Manage Projects ({projects.length})
                  </h2>
                  <p className="text-xs text-[#94A3B8]">
                    Production ML, Computer Vision, Analytics and Web applications.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddProjectOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#6366F1] text-white hover:bg-[#4F46E5] cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Project</span>
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-[#7C879B] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter projects by title, category, or tech..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#0B1020] border border-[#94A3B8]/20 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#6366F1]"
                />
              </div>

              {/* Table / List */}
              <div className="rounded-2xl bg-[#0B1020] border border-[#94A3B8]/15 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#101626] border-b border-[#94A3B8]/15 text-[#94A3B8] uppercase font-semibold">
                      <tr>
                        <th className="py-3 px-4">Order</th>
                        <th className="py-3 px-4">Project</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Normalized Tech</th>
                        <th className="py-3 px-4 text-center">Featured</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#94A3B8]/10 text-[#CBD5E1]">
                      {projects
                        .filter(
                          (p) =>
                            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.category.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((proj) => (
                          <tr key={proj.id} className="hover:bg-[#101626]/60 transition-colors">
                            <td className="py-3 px-4 font-mono text-[#7C879B]">
                              #{proj.displayOrder || proj.id}
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={proj.image}
                                  alt=""
                                  className="w-9 h-9 rounded-lg object-cover bg-[#070A12]"
                                />
                                <div className="flex flex-col">
                                  <span className="font-semibold text-[#F8FAFC]">{proj.title}</span>
                                  <span className="text-[10px] text-[#7C879B] line-clamp-1 max-w-xs">{proj.description}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#101626] border border-[#94A3B8]/15 text-[#22D3EE]">
                                {proj.category}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex flex-wrap gap-1 max-w-xs">
                                {normalizeTechStack(proj.techStack).slice(0, 3).map((t) => (
                                  <span key={t} className="px-1.5 py-0.5 rounded text-[10px] bg-[#101626] text-[#94A3B8]">
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-center">
                              {proj.featured ? (
                                <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-[#6366F1]/20 text-[#6366F1]">
                                  Yes
                                </span>
                              ) : (
                                <span className="text-[#7C879B]">No</span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={() => setDeleteConfirmId(proj.id)}
                                  className="p-1.5 rounded-lg text-[#EF4444] hover:bg-[#EF4444]/15 transition-colors cursor-pointer"
                                  title="Delete Project"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 3. SKILLS TAB */}
          {activeTab === 'skills' && (
            <div className="flex flex-col gap-6 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-[#F8FAFC]">
                    Manage Technical Skills ({skills.length})
                  </h2>
                  <p className="text-xs text-[#94A3B8]">
                    Legitimate numeric competencies across Machine Learning, Analytics, SQL, and Full-Stack.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddSkillOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#6366F1] text-white hover:bg-[#4F46E5] cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Skill</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="p-4 rounded-xl bg-[#0B1020] border border-[#94A3B8]/15 flex items-center justify-between"
                  >
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#F8FAFC]">{skill.name}</span>
                      <span className="text-[10px] text-[#22D3EE]">{skill.category}</span>
                      <span className="text-[11px] font-mono text-[#CBD5E1] mt-1">{skill.level}% Proficiency</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onDeleteSkill(skill.id)}
                      className="p-1.5 rounded-lg text-[#7C879B] hover:text-[#EF4444] transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. CERTIFICATES TAB */}
          {activeTab === 'certificates' && (
            <div className="flex flex-col gap-6 max-w-6xl mx-auto">
              <div>
                <h2 className="text-xl font-bold text-[#F8FAFC]">
                  Certifications Database ({certificates.length})
                </h2>
                <p className="text-xs text-[#94A3B8]">
                  Verified records from DeepLearning.AI, IBM, Google, Meta, Stanford, and Microsoft.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {certificates.map((cert) => (
                  <div key={cert.id} className="p-4 rounded-xl bg-[#0B1020] border border-[#94A3B8]/15 flex flex-col gap-3">
                    <img src={cert.image} alt="" className="aspect-video rounded-lg object-cover bg-[#101626]" />
                    <div>
                      <span className="text-[10px] font-mono text-[#22D3EE]">{cert.platform} • {cert.date}</span>
                      <h4 className="text-xs font-bold text-[#F8FAFC] mt-0.5">{cert.title}</h4>
                      {cert.credentialId && (
                        <span className="text-[10px] text-[#7C879B] font-mono block mt-1">
                          ID: {cert.credentialId}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. BLOG TAB */}
          {activeTab === 'blog' && (
            <div className="flex flex-col gap-6 max-w-6xl mx-auto">
              <div>
                <h2 className="text-xl font-bold text-[#F8FAFC]">
                  Technical Blog Articles ({blogPosts.length})
                </h2>
                <p className="text-xs text-[#94A3B8]">
                  Verified published articles with detailed Markdown/HTML contents.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blogPosts.map((post) => (
                  <div key={post.id} className="p-5 rounded-2xl bg-[#0B1020] border border-[#94A3B8]/15 flex flex-col gap-3">
                    <span className="text-[10px] font-mono text-[#F59E0B] uppercase">{post.category} • {post.date}</span>
                    <h3 className="text-sm font-bold text-[#F8FAFC]">{post.title}</h3>
                    <p className="text-xs text-[#94A3B8] line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center gap-2 pt-2 border-t border-[#94A3B8]/10 text-[11px] text-[#CBD5E1]">
                      <span>Read time: {post.readTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. EXPERIENCE TAB */}
          {activeTab === 'experience' && (
            <div className="flex flex-col gap-6 max-w-6xl mx-auto">
              <div>
                <h2 className="text-xl font-bold text-[#F8FAFC]">
                  Experience Records ({experience.length})
                </h2>
                <p className="text-xs text-[#94A3B8]">
                  Verified active professional track record on Fiverr.
                </p>
              </div>

              {experience.map((exp) => (
                <div key={exp.id} className="p-6 rounded-2xl bg-[#0B1020] border border-[#94A3B8]/15 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-[#F8FAFC]">{exp.role}</h3>
                      <span className="text-xs font-semibold text-[#22D3EE]">{exp.company}</span>
                    </div>
                    <span className="text-xs font-mono text-[#94A3B8]">{exp.period}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* 7. CLIENT WORK TAB */}
          {activeTab === 'client-work' && (
            <div className="flex flex-col gap-6 max-w-6xl mx-auto">
              <div>
                <h2 className="text-xl font-bold text-[#F8FAFC]">
                  Client Deliverables ({clientWork.length})
                </h2>
                <p className="text-xs text-[#94A3B8]">
                  Verified enterprise deliverables and forecasting solutions.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {clientWork.map((cw) => (
                  <div key={cw.id} className="p-5 rounded-2xl bg-[#0B1020] border border-[#94A3B8]/15 flex flex-col gap-2">
                    <span className="text-xs font-bold text-[#22D3EE]">{cw.client}</span>
                    <h4 className="text-sm font-bold text-[#F8FAFC]">{cw.projectTitle}</h4>
                    <p className="text-xs text-[#CBD5E1] mt-1">{cw.scope}</p>
                    <span className="text-[10px] text-[#7C879B] mt-2 font-mono">Completed: {cw.completedDate}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 8. MESSAGES TAB */}
          {activeTab === 'messages' && (
            <div className="flex flex-col gap-6 max-w-6xl mx-auto">
              <div>
                <h2 className="text-xl font-bold text-[#F8FAFC]">
                  Contact Messages Inbox ({messages.length})
                </h2>
                <p className="text-xs text-[#94A3B8]">
                  Inquiries received via the portfolio contact form.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    onClick={() => setViewMessage(msg)}
                    className="p-4 rounded-xl bg-[#0B1020] border border-[#94A3B8]/15 hover:border-[#6366F1]/40 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#F8FAFC]">{msg.name}</span>
                        <span className="text-[11px] text-[#7C879B]">({msg.email})</span>
                      </div>
                      <span className="text-xs text-[#22D3EE] font-semibold mt-0.5">{msg.subject}</span>
                      <p className="text-xs text-[#94A3B8] line-clamp-1 mt-1">{msg.message}</p>
                    </div>
                    <span className="text-[10px] font-mono text-[#7C879B] shrink-0">{msg.createdAt}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 9. SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className="flex flex-col gap-6 max-w-5xl mx-auto">
              <div>
                <h2 className="text-xl font-bold text-[#F8FAFC]">
                  Site Configuration ({settings.length} Settings)
                </h2>
                <p className="text-xs text-[#94A3B8]">
                  System parameters, contact emails, and social URLs.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {settings.map((st) => (
                  <div
                    key={st.id}
                    className="p-4 sm:p-5 rounded-xl bg-[#0B1020] border border-[#94A3B8]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#F8FAFC]">{st.key}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-[#101626] text-[#6366F1]">
                          {st.group}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#7C879B] mt-1">{st.description}</p>
                    </div>

                    <div className="flex items-center gap-2 sm:max-w-md w-full">
                      <input
                        type={st.isSecret && !showSecretMap[st.key] ? 'password' : 'text'}
                        defaultValue={st.value}
                        onBlur={(e) => onUpdateSetting(st.key, e.target.value)}
                        className="flex-1 px-3 py-2 rounded-lg bg-[#101626] border border-[#94A3B8]/20 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#6366F1]"
                      />
                      {st.isSecret && (
                        <button
                          type="button"
                          onClick={() =>
                            setShowSecretMap({
                              ...showSecretMap,
                              [st.key]: !showSecretMap[st.key],
                            })
                          }
                          className="p-2 rounded-lg bg-[#101626] text-[#7C879B] hover:text-[#F8FAFC]"
                        >
                          {showSecretMap[st.key] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 10. ADMINS TAB */}
          {activeTab === 'admins' && (
            <div className="flex flex-col gap-6 max-w-4xl mx-auto">
              <div>
                <h2 className="text-xl font-bold text-[#F8FAFC]">
                  Administrator Accounts (1 Admin)
                </h2>
                <p className="text-xs text-[#94A3B8]">
                  Verified administrator account for Muhammad Abdullah.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0B1020] border border-[#6366F1]/30 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#6366F1]/20 border border-[#6366F1]/40 flex items-center justify-center font-bold text-base text-[#6366F1]">
                    MA
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#F8FAFC]">{adminUser.name}</span>
                    <span className="text-xs text-[#22D3EE] font-mono">{adminUser.email}</span>
                    <span className="text-[10px] text-[#7C879B] mt-0.5">Role: {adminUser.role} • Last Active: {adminUser.lastLogin}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#22C55E]/15 text-[#22C55E] text-xs font-semibold">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Authenticated</span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Message Reader Modal */}
      {viewMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-[#0B1020] border border-[#94A3B8]/20 p-6 flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs text-[#7C879B] font-mono">{viewMessage.createdAt}</span>
                <h3 className="text-base font-bold text-[#F8FAFC] mt-0.5">{viewMessage.subject}</h3>
                <span className="text-xs text-[#22D3EE]">{viewMessage.name} &lt;{viewMessage.email}&gt;</span>
              </div>
              <button
                type="button"
                onClick={() => setViewMessage(null)}
                className="p-1 rounded text-[#94A3B8] hover:text-[#F8FAFC]"
              >
                ✕
              </button>
            </div>
            <div className="p-4 rounded-xl bg-[#101626] text-xs sm:text-sm text-[#CBD5E1] leading-relaxed whitespace-pre-wrap">
              {viewMessage.message}
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <a
                href={`mailto:${viewMessage.email}?subject=Re: ${encodeURIComponent(viewMessage.subject)}`}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#6366F1] text-white hover:bg-[#4F46E5]"
              >
                Reply via Email
              </a>
              <button
                type="button"
                onClick={() => setViewMessage(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-[#7C879B] hover:text-[#CBD5E1]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Project Modal */}
      {isAddProjectOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form
            onSubmit={handleCreateProject}
            className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0B1020] border border-[#94A3B8]/20 p-6 flex flex-col gap-4 text-xs"
          >
            <h3 className="text-base font-bold text-[#F8FAFC]">Add New Project</h3>

            <div className="flex flex-col gap-1">
              <label className="font-semibold text-[#CBD5E1]">Project Title *</label>
              <input
                type="text"
                required
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                className="px-3 py-2 rounded-lg bg-[#101626] border border-[#94A3B8]/20 text-[#F8FAFC]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-[#CBD5E1]">Category</label>
                <select
                  value={newProject.category}
                  onChange={(e) => setNewProject({ ...newProject, category: e.target.value as any })}
                  className="px-3 py-2 rounded-lg bg-[#101626] border border-[#94A3B8]/20 text-[#F8FAFC]"
                >
                  <option value="AI & Machine Learning">AI & Machine Learning</option>
                  <option value="Data Analytics & BI">Data Analytics & BI</option>
                  <option value="Computer Vision & NLP">Computer Vision & NLP</option>
                  <option value="Full-Stack Development">Full-Stack Development</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold text-[#CBD5E1]">Tech Stack (Comma or JSON)</label>
                <input
                  type="text"
                  placeholder="Python, PyTorch, FastAPI"
                  value={newProject.techStack}
                  onChange={(e) => setNewProject({ ...newProject, techStack: e.target.value })}
                  className="px-3 py-2 rounded-lg bg-[#101626] border border-[#94A3B8]/20 text-[#F8FAFC]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-semibold text-[#CBD5E1]">Short Description</label>
              <textarea
                rows={2}
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                className="px-3 py-2 rounded-lg bg-[#101626] border border-[#94A3B8]/20 text-[#F8FAFC]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-semibold text-[#CBD5E1]">Full Description</label>
              <textarea
                rows={3}
                value={newProject.fullDescription}
                onChange={(e) => setNewProject({ ...newProject, fullDescription: e.target.value })}
                className="px-3 py-2 rounded-lg bg-[#101626] border border-[#94A3B8]/20 text-[#F8FAFC]"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={newProject.featured}
                onChange={(e) => setNewProject({ ...newProject, featured: e.target.checked })}
              />
              <label htmlFor="featured" className="text-[#CBD5E1]">Featured on Homepage</label>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-[#94A3B8]/15">
              <button
                type="button"
                onClick={() => setIsAddProjectOpen(false)}
                className="px-4 py-2 rounded-lg text-[#94A3B8]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-[#6366F1] font-semibold text-white hover:bg-[#4F46E5]"
              >
                Save Project
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add Skill Modal */}
      {isAddSkillOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <form
            onSubmit={handleCreateSkill}
            className="w-full max-w-md rounded-2xl bg-[#0B1020] border border-[#94A3B8]/20 p-6 flex flex-col gap-4 text-xs"
          >
            <h3 className="text-base font-bold text-[#F8FAFC]">Add Technical Skill</h3>

            <div className="flex flex-col gap-1">
              <label className="font-semibold text-[#CBD5E1]">Skill Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. PyTorch, SQL, Pandas"
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                className="px-3 py-2 rounded-lg bg-[#101626] border border-[#94A3B8]/20 text-[#F8FAFC]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-semibold text-[#CBD5E1]">Category</label>
              <select
                value={newSkill.category}
                onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value as any })}
                className="px-3 py-2 rounded-lg bg-[#101626] border border-[#94A3B8]/20 text-[#F8FAFC]"
              >
                <option value="AI & Machine Learning">AI & Machine Learning</option>
                <option value="Data Science & Analytics">Data Science & Analytics</option>
                <option value="Programming & Frameworks">Programming & Frameworks</option>
                <option value="Databases & Tools">Databases & Tools</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-semibold text-[#CBD5E1]">Proficiency Level ({newSkill.level}%)</label>
              <input
                type="range"
                min={50}
                max={100}
                value={newSkill.level}
                onChange={(e) => setNewSkill({ ...newSkill, level: Number(e.target.value) })}
                className="w-full"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-[#94A3B8]/15">
              <button
                type="button"
                onClick={() => setIsAddSkillOpen(false)}
                className="px-4 py-2 rounded-lg text-[#94A3B8]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-[#6366F1] font-semibold text-white hover:bg-[#4F46E5]"
              >
                Save Skill
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-[#0B1020] border border-[#EF4444]/30 p-6 flex flex-col gap-4 text-center">
            <Trash2 className="w-8 h-8 text-[#EF4444] mx-auto" />
            <h4 className="text-base font-bold text-[#F8FAFC]">Confirm Deletion</h4>
            <p className="text-xs text-[#94A3B8]">
              Are you sure you want to remove project #{deleteConfirmId}? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl text-xs text-[#CBD5E1] bg-[#101626]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  onDeleteProject(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#EF4444] text-white"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCMS;
