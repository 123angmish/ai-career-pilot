import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Sun, Moon, LogOut, User as UserIcon, Bell, Sparkles, FileText, Link2, Award, MessageSquare, Globe } from 'lucide-react';
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
    : 'User Account';

  return (
    <header className="h-16 border-b border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-900 px-6 flex items-center justify-between sticky top-0 z-20 select-none">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-sm text-zinc-500 dark:text-zinc-400">
        <Link
          to="/dashboard"
          className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors font-medium"
        >
          CareerPilot
        </Link>
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={crumb.url}>
            <span>/</span>
            <Link
              to={crumb.url}
              className={`hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors ${
                index === breadcrumbs.length - 1
                  ? 'text-zinc-900 dark:text-zinc-100 font-medium'
                  : ''
              }`}
            >
              {crumb.name}
            </Link>
          </React.Fragment>
        ))}
      </div>

      {/* Top Bar Actions */}
      <div className="flex items-center space-x-4">
        {/* OUR SERVICES Dropdown */}
        <Dropdown>
          <DropdownTrigger>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-500/10 hover:bg-brand-500/20 text-brand-600 dark:text-brand-400 font-extrabold text-xs transition-all border border-brand-500/20">
              <Sparkles className="h-3.5 w-3.5" /> OUR SERVICES
            </button>
          </DropdownTrigger>
          <DropdownMenu align="right" className="w-64 p-2 bg-zinc-950 text-white border-zinc-800 rounded-2xl shadow-2xl space-y-1">
            <div className="px-3 py-2 text-[10px] font-black tracking-widest text-zinc-400 uppercase border-b border-zinc-850">
              OUR SERVICES
            </div>
            <DropdownItem className="hover:bg-zinc-850 rounded-xl">
              <Link to="/resumes/builder" className="flex items-center gap-3 w-full py-1 text-xs font-bold text-zinc-200">
                <FileText className="h-4 w-4 text-blue-400" /> Resume Writing
              </Link>
            </DropdownItem>
            <DropdownItem className="hover:bg-zinc-850 rounded-xl">
              <Link to="/services/linkedin" className="flex items-center gap-3 w-full py-1 text-xs font-bold text-zinc-200">
                <Link2 className="h-4 w-4 text-sky-400" /> LinkedIn Profile Enhancement
              </Link>
            </DropdownItem>
            <DropdownItem className="hover:bg-zinc-850 rounded-xl">
              <Link to="/services/courses" className="flex items-center gap-3 w-full py-1 text-xs font-bold text-zinc-200">
                <Award className="h-4 w-4 text-emerald-400" /> Courses & Certification
              </Link>
            </DropdownItem>
            <DropdownItem className="hover:bg-zinc-850 rounded-xl">
              <Link to="/interview/questions" className="flex items-center gap-3 w-full py-1 text-xs font-bold text-zinc-200">
                <MessageSquare className="h-4 w-4 text-purple-400" /> Interview Preparation
              </Link>
            </DropdownItem>
            <DropdownItem className="hover:bg-zinc-850 rounded-xl">
              <Link to="/services/global-careers" className="flex items-center gap-3 w-full py-1 text-xs font-bold text-zinc-200">
                <Globe className="h-4 w-4 text-indigo-400" /> International Study & Careers
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        {/* Notifications */}
        <button className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
          <Bell className="h-5 w-5" />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 transition-colors"
          aria-label="Toggle theme"
        >
          {resolvedTheme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </button>

        {/* User Dropdown Menu */}
        <Dropdown>
          <DropdownTrigger>
            <Avatar fallback={userInitials} size="sm" className="hover:opacity-85" />
          </DropdownTrigger>
          <DropdownMenu align="right">
            <div className="px-4 py-2 border-b border-zinc-150 dark:border-zinc-800">
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-none">
                {userFullName}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-1">
                {user?.email || 'user@example.com'}
              </p>
            </div>
            <DropdownItem>
              <Link to="/profile" className="flex items-center w-full">
                <UserIcon className="h-4 w-4 mr-2.5" />
                Profile
              </Link>
            </DropdownItem>
            <DropdownItem>
              <Link to="/settings" className="flex items-center w-full">
                <svg
                  className="h-4 w-4 mr-2.5 text-zinc-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Settings
              </Link>
            </DropdownItem>
            <DropdownItem onClick={() => { logout(); navigate('/login', { replace: true }); }} className="text-red-600 dark:text-red-400">
              <LogOut className="h-4 w-4 mr-2.5" />
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </header>
  );
};
