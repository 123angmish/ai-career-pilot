import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FileCheck,
  GitCompare,
  HelpCircle,
  Video,
  MessageSquare,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Wand2,
  Compass,
  Award,
  Globe,
  Pin,
  Briefcase,
  FileText,
  Link2
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

interface MenuGroup {
  category: string;
  items: { name: string; path: string; icon: React.ComponentType<{ className?: string }> }[];
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const [isHovered, setIsHovered] = useState(false);

  const menuGroups: MenuGroup[] = [
    {
      category: 'OVERVIEW',
      items: [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Career Profile', path: '/profile', icon: User },
      ]
    },
    {
      category: 'CAREER TOOLS',
      items: [
        { name: 'Resume Builder', path: '/resumes/builder', icon: Wand2 },
        { name: 'ATS Analyzer', path: '/resumes/analysis', icon: FileCheck },
        { name: 'Skill Gap Analyzer', path: '/resumes/jd-match', icon: GitCompare },
        { name: 'Cover Letter', path: '/cover-letter', icon: FileText },
        { name: 'Career Roadmap', path: '/career-path', icon: Compass },
      ]
    },
    {
      category: 'JOB PREPARATION',
      items: [
        { name: 'Job Recommendations', path: '/services/global-careers', icon: Globe },
        { name: 'Job Tracker', path: '/job-tracker', icon: Briefcase },
        { name: 'Interview Preparation', path: '/interview/questions', icon: HelpCircle },
        { name: 'Mock Interviews', path: '/interview/mock', icon: Video },
      ]
    },
    {
      category: 'AI TOOLS & LEARNING',
      items: [
        { name: 'AI Career Assistant', path: '/chat', icon: MessageSquare },
        { name: 'LinkedIn Enhancer', path: '/services/linkedin', icon: Link2 },
        { name: 'Learning & Projects', path: '/services/courses', icon: Award },
      ]
    },
    {
      category: 'ACCOUNT',
      items: [
        { name: 'Settings & Security', path: '/settings', icon: Settings },
      ]
    }
  ];

  const effectiveExpanded = !isCollapsed || isHovered;

  return (
    <motion.aside
      onMouseEnter={() => isCollapsed && setIsHovered(true)}
      onMouseLeave={() => isCollapsed && setIsHovered(false)}
      animate={{ width: effectiveExpanded ? 260 : 72 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="relative h-screen bg-white/95 backdrop-blur-2xl border-r border-slate-200 flex flex-col justify-between z-40 select-none shadow-sm overflow-hidden"
    >
      {/* Top Header Logo */}
      <div>
        <div
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-16 flex items-center justify-between px-4 border-b border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors"
          title={effectiveExpanded ? 'Click to collapse sidebar' : 'Click to expand sidebar'}
        >
          <div className="flex items-center gap-3 font-bold text-slate-900 overflow-hidden">
            <div className="relative flex items-center justify-center h-10 w-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-600 text-white shrink-0 shadow-md shadow-indigo-500/20">
              <Sparkles className="h-5 w-5" />
            </div>

            <AnimatePresence>
              {effectiveExpanded && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="tracking-tight text-lg font-black text-slate-900 font-display whitespace-nowrap"
                >
                  CareerPilot
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {effectiveExpanded && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsCollapsed(!isCollapsed);
              }}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              title={isCollapsed ? 'Pin Sidebar' : 'Unpin Sidebar'}
            >
              <Pin className={`h-4 w-4 transition-transform ${isCollapsed ? 'rotate-45 text-slate-400' : 'text-indigo-600'}`} />
            </button>
          )}
        </div>

        {/* Navigation List grouped by Category */}
        <nav className="p-3 space-y-4 overflow-y-auto max-h-[calc(100vh-8.5rem)] scrollbar-custom">
          {menuGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              {effectiveExpanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-3 pt-2 pb-1 text-[10px] font-extrabold tracking-widest text-slate-400 uppercase font-sans"
                >
                  {group.category}
                </motion.div>
              )}
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group ${
                        isActive
                          ? 'text-indigo-700 bg-indigo-50/80 border border-indigo-100 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon className={`h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-700'}`} />

                        {effectiveExpanded && (
                          <span className="truncate">{item.name}</span>
                        )}

                        {isActive && (
                          <motion.div
                            layoutId="activeGlow"
                            className="absolute left-0 w-1.5 h-6 rounded-r-full bg-indigo-600"
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>
      </div>

      {/* Footer Collapse Toggle */}
      <div className="p-3 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
        {effectiveExpanded && (
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-100">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-extrabold text-indigo-700 uppercase tracking-widest">
              v2.5 AI Engine
            </span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-all ml-auto bg-white shadow-xs cursor-pointer"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
