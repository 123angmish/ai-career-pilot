import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  UploadCloud,
  FileCheck,
  GitCompare,
  FileText,
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
  Link2,
  Award,
  Globe,
  Pin
} from 'lucide-react';
import { Tooltip } from './ui/Tooltip';

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
      category: 'CORE PLATFORM',
      items: [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Upload Resume', path: '/resumes/upload', icon: UploadCloud },
        { name: 'AI Resume Builder', path: '/resumes/builder', icon: Wand2 },
      ]
    },
    {
      category: 'OPTIMIZATION & ATS',
      items: [
        { name: 'Resume Analysis', path: '/resumes/analysis', icon: FileCheck },
        { name: 'JD Matcher', path: '/resumes/jd-match', icon: GitCompare },
        { name: 'Cover Letter Gen', path: '/cover-letter', icon: FileText },
      ]
    },
    {
      category: 'INTERVIEWS & SERVICES',
      items: [
        { name: 'Interview Qs', path: '/interview/questions', icon: HelpCircle },
        { name: 'Mock Interview', path: '/interview/mock', icon: Video },
        { name: 'LinkedIn Enhancer', path: '/services/linkedin', icon: Link2 },
        { name: 'Courses & Certs', path: '/services/courses', icon: Award },
        { name: 'Global Careers', path: '/services/global-careers', icon: Globe },
      ]
    },
    {
      category: 'CAREER STRATEGY',
      items: [
        { name: 'Career & Salary', path: '/career-path', icon: Compass },
        { name: 'AI Career Chat', path: '/chat', icon: MessageSquare },
        { name: 'Profile', path: '/profile', icon: User },
        { name: 'Settings', path: '/settings', icon: Settings },
      ]
    }
  ];

  // Effective expanded state: true if pinned OR hovered
  const effectiveExpanded = !isCollapsed || isHovered;

  const activeClassName = 'bg-blue-600/15 border-l-4 border-blue-500 text-blue-600 dark:text-blue-400 font-black shadow-xs';
  const inactiveClassName = 'text-zinc-600 hover:bg-zinc-100/70 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-50 font-semibold border-l-4 border-transparent';

  return (
    <div
      onMouseEnter={() => isCollapsed && setIsHovered(true)}
      onMouseLeave={() => isCollapsed && setIsHovered(false)}
      className={`relative h-screen bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border-r border-zinc-200/80 dark:border-zinc-800 flex flex-col justify-between transition-all duration-300 z-40 select-none shadow-xl ${
        effectiveExpanded ? 'w-64' : 'w-16'
      }`}
    >
      {/* Top Header Logo */}
      <div>
        <div
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-16 flex items-center justify-between px-4 border-b border-zinc-200/80 dark:border-zinc-800 cursor-pointer hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 transition-colors"
          title={effectiveExpanded ? 'Click to collapse sidebar' : 'Click to expand sidebar'}
        >
          <div className="flex items-center gap-3 font-bold text-zinc-900 dark:text-zinc-50 overflow-hidden">
            <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shrink-0 shadow-md">
              <Sparkles className="h-5 w-5" />
            </div>
            {effectiveExpanded && (
              <span className="tracking-tight text-lg font-black bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                CareerPilot
              </span>
            )}
          </div>

          {effectiveExpanded && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsCollapsed(!isCollapsed);
              }}
              className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              title={isCollapsed ? 'Pin Sidebar' : 'Unpin Sidebar'}
            >
              <Pin className={`h-3.5 w-3.5 transition-transform ${isCollapsed ? 'rotate-45 text-zinc-400' : 'text-blue-500'}`} />
            </button>
          )}
        </div>

        {/* Navigation List grouped by Category */}
        <nav className="p-2 space-y-4 overflow-y-auto max-h-[calc(100vh-8rem)] scrollbar-none">
          {menuGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              {effectiveExpanded && (
                <div className="px-3 pt-2 pb-1 text-[10px] font-black tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
                  {group.category}
                </div>
              )}
              {group.items.map((item) => {
                const Icon = item.icon;
                const linkContent = (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-xl text-xs transition-all duration-150 ${
                        isActive ? activeClassName : inactiveClassName
                      }`
                    }
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {effectiveExpanded && <span className="truncate">{item.name}</span>}
                  </NavLink>
                );

                return !effectiveExpanded ? (
                  <Tooltip key={item.path} content={item.name} position="right" className="w-full">
                    {linkContent}
                  </Tooltip>
                ) : (
                  <React.Fragment key={item.path}>
                    {linkContent}
                  </React.Fragment>
                );
              })}
            </div>
          ))}
        </nav>
      </div>

      {/* Collapse Toggle Footer */}
      <div className="p-3 border-t border-zinc-200/80 dark:border-zinc-800 flex items-center justify-between">
        {effectiveExpanded && (
          <span className="text-[10px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider pl-1">
            Enterprise v2.5
          </span>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="p-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 focus:outline-none transition-colors ml-auto"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
