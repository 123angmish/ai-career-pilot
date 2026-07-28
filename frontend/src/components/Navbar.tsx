import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Sun, Moon, LogOut, User as UserIcon, Bell, Sparkles, FileText, Link2, Award, MessageSquare, Globe, Search, Command, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Avatar } from './ui/Avatar';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from './ui/Dropdown';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { resolvedTheme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  // Generate breadcrumbs from path
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const breadcrumbs = pathSegments.map((segment, index) => {
    const url = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const name = segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());

    return { name, url };
  });

  const userInitials = user
    ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
    : 'U';

  const userFullName = user
    ? `${user.firstName} ${user.lastName}`
    : 'Enterprise Candidate';

  return (
    <header className="h-16 border-b border-white/10 bg-[#050816]/80 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-30 select-none">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-sm text-zinc-400">
        <Link
          to="/dashboard"
          className="hover:text-white transition-colors font-semibold text-zinc-300"
        >
          CareerPilot
        </Link>
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={crumb.url}>
            <span className="text-zinc-600">/</span>
            <Link
              to={crumb.url}
              className={`hover:text-white transition-colors ${
                index === breadcrumbs.length - 1
                  ? 'text-indigo-400 font-semibold'
                  : 'text-zinc-400'
              }`}
            >
              {crumb.name}
            </Link>
          </React.Fragment>
        ))}
      </div>

      {/* Quick Search Bar Placeholder / Command Trigger */}
      <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-400 hover:bg-white/10 hover:border-indigo-500/30 transition-all cursor-pointer w-64">
        <Search className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
        <span className="flex-1 truncate">Search tools, resumes, jobs...</span>
        <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-[10px] text-zinc-300 font-mono">
          <Command className="h-3 w-3" /> K
        </div>
      </div>

      {/* Top Bar Actions */}
      <div className="flex items-center space-x-3">
        {/* OUR SERVICES Dropdown */}
        <Dropdown>
          <DropdownTrigger>
            <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600/20 via-violet-600/20 to-cyan-500/20 hover:from-indigo-600/30 hover:to-cyan-500/30 text-indigo-300 font-bold text-xs transition-all border border-indigo-500/30 shadow-lg shadow-indigo-500/10">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400 animate-pulse" /> OUR SERVICES
            </button>
          </DropdownTrigger>
          <DropdownMenu align="right" className="w-64 p-2 bg-[#0b0f19] text-white border-white/10 rounded-2xl shadow-2xl space-y-1 backdrop-blur-2xl">
            <div className="px-3 py-2 text-[10px] font-black tracking-widest text-indigo-300/60 uppercase border-b border-white/10">
              EXPLORE SERVICES
            </div>
            <DropdownItem className="hover:bg-white/5 rounded-xl">
              <Link to="/resumes/builder" className="flex items-center gap-3 w-full py-1.5 text-xs font-semibold text-zinc-200">
                <FileText className="h-4 w-4 text-indigo-400" /> Resume Writing
              </Link>
            </DropdownItem>
            <DropdownItem className="hover:bg-white/5 rounded-xl">
              <Link to="/services/linkedin" className="flex items-center gap-3 w-full py-1.5 text-xs font-semibold text-zinc-200">
                <Link2 className="h-4 w-4 text-cyan-400" /> LinkedIn Enhancement
              </Link>
            </DropdownItem>
            <DropdownItem className="hover:bg-white/5 rounded-xl">
              <Link to="/services/courses" className="flex items-center gap-3 w-full py-1.5 text-xs font-semibold text-zinc-200">
                <Award className="h-4 w-4 text-emerald-400" /> Courses & Certification
              </Link>
            </DropdownItem>
            <DropdownItem className="hover:bg-white/5 rounded-xl">
              <Link to="/interview/questions" className="flex items-center gap-3 w-full py-1.5 text-xs font-semibold text-zinc-200">
                <MessageSquare className="h-4 w-4 text-purple-400" /> Interview Preparation
              </Link>
            </DropdownItem>
            <DropdownItem className="hover:bg-white/5 rounded-xl">
              <Link to="/services/global-careers" className="flex items-center gap-3 w-full py-1.5 text-xs font-semibold text-zinc-200">
                <Globe className="h-4 w-4 text-amber-400" /> Global Careers & Study
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        {/* Notifications */}
        <div className="relative">
          <button className="p-2 rounded-xl border border-white/10 hover:bg-white/10 text-zinc-400 hover:text-white transition-all">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-indigo-500 animate-ping" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-indigo-500" />
          </button>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl border border-white/10 hover:bg-white/10 text-zinc-400 hover:text-white transition-all"
          aria-label="Toggle theme"
        >
          {resolvedTheme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4 text-amber-400" />}
        </button>

        {/* User Dropdown Menu */}
        <Dropdown>
          <DropdownTrigger>
            <Avatar fallback={userInitials} size="sm" className="hover:ring-2 hover:ring-indigo-500/50 cursor-pointer transition-all border border-white/10" />
          </DropdownTrigger>
          <DropdownMenu align="right" className="w-56 p-2 bg-[#0b0f19] text-white border-white/10 rounded-2xl shadow-2xl">
            <div className="px-3 py-2 border-b border-white/10">
              <p className="text-sm font-bold text-white leading-none">
                {userFullName}
              </p>
              <p className="text-xs text-zinc-400 truncate mt-1">
                {user?.email || 'user@example.com'}
              </p>
            </div>
            <DropdownItem className="hover:bg-white/5 rounded-xl mt-1">
              <Link to="/profile" className="flex items-center w-full text-xs font-semibold py-1">
                <UserIcon className="h-4 w-4 mr-2.5 text-indigo-400" />
                Profile
              </Link>
            </DropdownItem>
            <DropdownItem className="hover:bg-white/5 rounded-xl">
              <Link to="/settings" className="flex items-center w-full text-xs font-semibold py-1">
                <Settings className="h-4 w-4 mr-2.5 text-indigo-400" />
                Settings
              </Link>
            </DropdownItem>
            <DropdownItem onClick={() => { logout(); navigate('/login', { replace: true }); }} className="text-rose-400 hover:bg-rose-500/10 rounded-xl">
              <LogOut className="h-4 w-4 mr-2.5" />
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </header>
  );
};
