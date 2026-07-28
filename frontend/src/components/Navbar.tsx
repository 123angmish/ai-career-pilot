import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { 
  LogOut, User as UserIcon, Bell, Sparkles, FileText, Link2, 
  Award, MessageSquare, Globe, Search, Command, Settings, X, 
  Compass, FileCheck, HelpCircle, Video, Bot, ArrowRight 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Avatar } from './ui/Avatar';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from './ui/Dropdown';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle Cmd+K or Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Quick Command Options
  const commandItems = [
    { title: 'AI Resume Builder', path: '/resumes/builder', icon: FileText, category: 'Tools' },
    { title: 'ATS Resume Analyzer', path: '/resumes/analysis', icon: FileCheck, category: 'Tools' },
    { title: 'Career Roadmap & Salary Index', path: '/career-path', icon: Compass, category: 'Career' },
    { title: 'Mock Technical Interview', path: '/interview/mock', icon: Video, category: 'Interview' },
    { title: 'Interview Question Bank', path: '/interview/questions', icon: HelpCircle, category: 'Interview' },
    { title: 'AI Career Assistant (Chat)', path: '/chat', icon: Bot, category: 'AI' },
    { title: 'Courses & Certifications', path: '/services/courses', icon: Award, category: 'Learning' },
    { title: 'Global Careers & Remote Jobs', path: '/services/global-careers', icon: Globe, category: 'Jobs' },
    { title: 'Profile Settings', path: '/settings', icon: Settings, category: 'Account' },
    { title: 'Student Career Profile', path: '/profile', icon: UserIcon, category: 'Account' },
  ];

  const filteredCommands = commandItems.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    <>
      <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-30 select-none shadow-xs">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-sm text-slate-500">
          <Link
            to="/dashboard"
            className="hover:text-indigo-600 transition-colors font-bold text-slate-900"
          >
            CareerPilot
          </Link>
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.url}>
              <span className="text-slate-300">/</span>
              <Link
                to={crumb.url}
                className={`hover:text-indigo-600 transition-colors ${
                  index === breadcrumbs.length - 1
                    ? 'text-indigo-600 font-bold'
                    : 'text-slate-500 font-medium'
                }`}
              >
                {crumb.name}
              </Link>
            </React.Fragment>
          ))}
        </div>

        {/* Command Palette Trigger Input */}
        <div 
          onClick={() => setCommandPaletteOpen(true)}
          className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100/80 border border-slate-200 text-xs text-slate-500 hover:bg-slate-100 hover:border-slate-300 transition-all cursor-pointer w-64 shadow-xs"
        >
          <Search className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          <span className="flex-1 truncate font-medium">Search tools, resumes, jobs...</span>
          <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] text-slate-500 font-mono shadow-2xs">
            <Command className="h-3 w-3" /> K
          </div>
        </div>

        {/* Top Bar Actions */}
        <div className="flex items-center space-x-3">
          {/* OUR SERVICES Dropdown */}
          <Dropdown>
            <DropdownTrigger>
              <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs transition-all border border-indigo-100 shadow-xs cursor-pointer">
                <Sparkles className="h-3.5 w-3.5 text-indigo-600 animate-pulse" /> OUR SERVICES
              </button>
            </DropdownTrigger>
            <DropdownMenu align="right" className="w-64 p-2 bg-white text-slate-900 border-slate-200 rounded-2xl shadow-xl space-y-1">
              <div className="px-3 py-2 text-[10px] font-extrabold tracking-widest text-slate-400 uppercase border-b border-slate-100">
                EXPLORE SERVICES
              </div>
              <DropdownItem className="hover:bg-slate-50 rounded-xl">
                <Link to="/resumes/builder" className="flex items-center gap-3 w-full py-1.5 text-xs font-semibold text-slate-700">
                  <FileText className="h-4 w-4 text-indigo-600" /> Resume Writing
                </Link>
              </DropdownItem>
              <DropdownItem className="hover:bg-slate-50 rounded-xl">
                <Link to="/services/linkedin" className="flex items-center gap-3 w-full py-1.5 text-xs font-semibold text-slate-700">
                  <Link2 className="h-4 w-4 text-cyan-600" /> LinkedIn Enhancement
                </Link>
              </DropdownItem>
              <DropdownItem className="hover:bg-slate-50 rounded-xl">
                <Link to="/services/courses" className="flex items-center gap-3 w-full py-1.5 text-xs font-semibold text-slate-700">
                  <Award className="h-4 w-4 text-emerald-600" /> Courses & Certification
                </Link>
              </DropdownItem>
              <DropdownItem className="hover:bg-slate-50 rounded-xl">
                <Link to="/interview/questions" className="flex items-center gap-3 w-full py-1.5 text-xs font-semibold text-slate-700">
                  <MessageSquare className="h-4 w-4 text-purple-600" /> Interview Preparation
                </Link>
              </DropdownItem>
              <DropdownItem className="hover:bg-slate-50 rounded-xl">
                <Link to="/services/global-careers" className="flex items-center gap-3 w-full py-1.5 text-xs font-semibold text-slate-700">
                  <Globe className="h-4 w-4 text-amber-600" /> Global Careers & Study
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          {/* Notifications */}
          <div className="relative">
            <button className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-all shadow-2xs cursor-pointer">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-indigo-600 animate-ping" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-indigo-600" />
            </button>
          </div>

          {/* User Dropdown Menu */}
          <Dropdown>
            <DropdownTrigger>
              <Avatar fallback={userInitials} size="sm" className="hover:ring-2 hover:ring-indigo-500/30 cursor-pointer transition-all border border-slate-200 shadow-2xs" />
            </DropdownTrigger>
            <DropdownMenu align="right" className="w-56 p-2 bg-white text-slate-900 border-slate-200 rounded-2xl shadow-xl">
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="text-sm font-bold text-slate-900 leading-none">
                  {userFullName}
                </p>
                <p className="text-xs text-slate-500 truncate mt-1 font-medium">
                  {user?.email || 'user@example.com'}
                </p>
              </div>
              <DropdownItem className="hover:bg-slate-50 rounded-xl mt-1">
                <Link to="/profile" className="flex items-center w-full text-xs font-semibold text-slate-700 py-1">
                  <UserIcon className="h-4 w-4 mr-2.5 text-indigo-600" />
                  Profile
                </Link>
              </DropdownItem>
              <DropdownItem className="hover:bg-slate-50 rounded-xl">
                <Link to="/settings" className="flex items-center w-full text-xs font-semibold text-slate-700 py-1">
                  <Settings className="h-4 w-4 mr-2.5 text-indigo-600" />
                  Settings
                </Link>
              </DropdownItem>
              <DropdownItem onClick={() => { logout(); navigate('/login', { replace: true }); }} className="text-rose-600 hover:bg-rose-50 rounded-xl">
                <LogOut className="h-4 w-4 mr-2.5" />
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </header>

      {/* Command Palette Modal */}
      {commandPaletteOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-xl mx-4 overflow-hidden animate-in zoom-in-95 duration-150">
            
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-slate-100 gap-3">
              <Search className="h-4 w-4 text-indigo-600 shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Type a command or search feature..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm text-slate-900 bg-transparent focus:outline-none font-medium"
              />
              <button 
                onClick={() => setCommandPaletteOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Command Results */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              <div className="px-3 py-1.5 text-[10px] font-extrabold tracking-widest text-slate-400 uppercase">
                Quick Navigation & Tools
              </div>

              {filteredCommands.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400 font-medium">
                  No matching tools or pages found.
                </div>
              ) : (
                filteredCommands.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCommandPaletteOpen(false);
                      setSearchQuery('');
                      navigate(item.path);
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 text-left transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-slate-100 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{item.title}</p>
                        <p className="text-[10px] text-slate-400 font-semibold">{item.category}</p>
                      </div>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))
              )}
            </div>

            <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
              <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-mono">ESC</kbd> to exit</span>
              <span>CareerPilot AI Quick Palette</span>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
