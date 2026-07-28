import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ChevronDown, 
  Menu, 
  X, 
  FileText, 
  FileCheck, 
  Compass, 
  GitCompare, 
  HelpCircle, 
  Bot, 
  BookOpen, 
  CheckCircle, 
  Video, 
  Map, 
  ArrowRight 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const PublicNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const featuresList = [
    { title: 'AI Resume Builder', desc: 'Create ATS-proof resumes with 1-click export', icon: FileText, path: '/resumes/builder', color: 'text-indigo-600' },
    { title: 'ATS Resume Analyzer', desc: 'Audit keyword coverage & ATS score', icon: FileCheck, path: '/resumes/analysis', color: 'text-purple-600' },
    { title: 'Career Roadmap', desc: 'AI-guided milestone & salary index', icon: Compass, path: '/career-path', color: 'text-amber-600' },
    { title: 'JD Matcher', desc: 'Compare resume against target Job Descriptions', icon: GitCompare, path: '/resumes/jd-match', color: 'text-emerald-600' },
    { title: 'Interview Preparation', desc: 'Practice top FAANG & Indian tech questions', icon: HelpCircle, path: '/interview/questions', color: 'text-rose-600' },
    { title: 'AI Career Assistant', desc: '24/7 AI Mentor for placement strategy', icon: Bot, path: '/chat', color: 'text-cyan-600' },
  ];

  const resourcesList = [
    { title: 'Placement Preparation', desc: 'Step-by-step campus placement guide', icon: CheckCircle, path: '/services/courses', color: 'text-emerald-600' },
    { title: 'Resume Tips & Hacks', desc: 'Recruiter-approved layout rules', icon: BookOpen, path: '/resumes/upload', color: 'text-indigo-600' },
    { title: 'Mock Interview Sessions', desc: '1-on-1 Google & Amazon Senior Mentors', icon: Video, path: '/interview/mock', color: 'text-purple-600' },
    { title: 'Global Career Roadmaps', desc: 'Visa pathways & remote US job portals', icon: Map, path: '/services/global-careers', color: 'text-amber-600' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-xs py-3' 
        : 'bg-white/70 backdrop-blur-md border-b border-slate-100 py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex items-center justify-center h-10 w-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white font-bold shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="h-5 w-5 animate-pulse" />
          </div>
          <span className="font-extrabold text-xl text-slate-900 tracking-tight font-display">
            CareerPilot
          </span>
        </Link>

        {/* Center Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/60 p-1.5 rounded-full border border-slate-200/60">
          <Link to="/" className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${location.pathname === '/' ? 'bg-white text-indigo-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'}`}>
            Home
          </Link>

          {/* Features Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setFeaturesOpen(true)}
            onMouseLeave={() => setFeaturesOpen(false)}
          >
            <button className="flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-bold text-slate-600 hover:text-slate-900 transition-all cursor-pointer">
              Features <ChevronDown className={`h-3.5 w-3.5 transition-transform ${featuresOpen ? 'rotate-180 text-indigo-600' : ''}`} />
            </button>

            <AnimatePresence>
              {featuresOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute left-0 mt-2 w-80 bg-white rounded-3xl border border-slate-200 shadow-xl p-3 grid grid-cols-1 gap-1 z-50"
                >
                  <div className="px-3 py-1.5 text-[10px] font-extrabold tracking-widest text-slate-400 uppercase">
                    Core AI Capabilities
                  </div>
                  {featuresList.map((item, idx) => (
                    <Link
                      key={idx}
                      to={isAuthenticated ? item.path : '/login'}
                      className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-slate-50 transition-colors group"
                    >
                      <div className={`p-2 rounded-xl bg-slate-100 ${item.color} shrink-0 group-hover:scale-105 transition-transform`}>
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{item.title}</h4>
                        <p className="text-[11px] text-slate-500 font-medium line-clamp-1">{item.desc}</p>
                      </div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a href="#how-it-works" className="px-4 py-1.5 rounded-full text-xs font-bold text-slate-600 hover:text-slate-900 transition-all">
            How It Works
          </a>

          <a href="#pricing" className="px-4 py-1.5 rounded-full text-xs font-bold text-slate-600 hover:text-slate-900 transition-all">
            Pricing
          </a>

          {/* Resources Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setResourcesOpen(true)}
            onMouseLeave={() => setResourcesOpen(false)}
          >
            <button className="flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-bold text-slate-600 hover:text-slate-900 transition-all cursor-pointer">
              Resources <ChevronDown className={`h-3.5 w-3.5 transition-transform ${resourcesOpen ? 'rotate-180 text-indigo-600' : ''}`} />
            </button>

            <AnimatePresence>
              {resourcesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute right-0 mt-2 w-72 bg-white rounded-3xl border border-slate-200 shadow-xl p-3 grid grid-cols-1 gap-1 z-50"
                >
                  <div className="px-3 py-1.5 text-[10px] font-extrabold tracking-widest text-slate-400 uppercase">
                    Placement Knowledge
                  </div>
                  {resourcesList.map((item, idx) => (
                    <Link
                      key={idx}
                      to={isAuthenticated ? item.path : '/login'}
                      className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-slate-50 transition-colors group"
                    >
                      <div className={`p-2 rounded-xl bg-slate-100 ${item.color} shrink-0 group-hover:scale-105 transition-transform`}>
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{item.title}</h4>
                        <p className="text-[11px] text-slate-500 font-medium line-clamp-1">{item.desc}</p>
                      </div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Right: Auth Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-full text-xs shadow-md shadow-indigo-500/20 transition-all hover:scale-105"
            >
              Go to Dashboard <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-indigo-600 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-full text-xs shadow-md shadow-indigo-500/20 transition-all hover:scale-105"
              >
                Get Started Free <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Animated Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col space-y-3 text-sm font-bold text-slate-800">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-indigo-600">Home</Link>
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="hover:text-indigo-600">Features</a>
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="hover:text-indigo-600">How It Works</a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="hover:text-indigo-600">Pricing</a>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 bg-indigo-600 text-white font-extrabold rounded-xl text-xs shadow-md"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-3 bg-indigo-600 text-white font-extrabold rounded-xl text-xs shadow-md"
                  >
                    Get Started Free
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default PublicNavbar;
