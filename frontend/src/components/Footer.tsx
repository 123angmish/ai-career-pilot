import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowUp, Globe, Share2, Send, MessageSquare } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 pt-16 pb-12 font-sans select-none">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-slate-100">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex items-center justify-center h-10 w-10 rounded-2xl bg-indigo-600 text-white font-bold shadow-md shadow-indigo-500/20">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="font-extrabold text-xl text-slate-900 tracking-tight font-display">
                CareerPilot
              </span>
            </Link>

            <p className="text-sm text-slate-500 leading-relaxed font-medium max-w-sm">
              The premier AI-powered career SaaS platform for engineering students & job seekers to build ATS resumes, practice mock interviews, and crack campus placements.
            </p>

            {/* Newsletter Input */}
            <div className="space-y-2 pt-2">
              <p className="text-xs font-bold text-slate-900 uppercase tracking-widest">Subscribe to Placement Digest</p>
              <div className="flex gap-2 max-w-sm">
                <input 
                  type="email" 
                  placeholder="enter your college email..." 
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                />
                <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold rounded-xl transition-all shadow-xs cursor-pointer">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Column 1: Product */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest font-display">Product</h4>
            <ul className="space-y-2 text-xs font-bold text-slate-500">
              <li><Link to="/resumes/builder" className="hover:text-indigo-600 transition-colors">AI Resume Builder</Link></li>
              <li><Link to="/resumes/analysis" className="hover:text-indigo-600 transition-colors">ATS Resume Analyzer</Link></li>
              <li><Link to="/career-path" className="hover:text-indigo-600 transition-colors">Career Roadmap</Link></li>
              <li><Link to="/interview/questions" className="hover:text-indigo-600 transition-colors">Interview Preparation</Link></li>
              <li><Link to="/services/global-careers" className="hover:text-indigo-600 transition-colors">Global Job Matches</Link></li>
            </ul>
          </div>

          {/* Column 2: Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest font-display">Resources</h4>
            <ul className="space-y-2 text-xs font-bold text-slate-500">
              <li><Link to="/services/courses" className="hover:text-indigo-600 transition-colors">Placement Guides</Link></li>
              <li><Link to="/interview/mock" className="hover:text-indigo-600 transition-colors">Mock Interview Prep</Link></li>
              <li><Link to="/chat" className="hover:text-indigo-600 transition-colors">AI Career Assistant</Link></li>
              <li><Link to="/services/linkedin" className="hover:text-indigo-600 transition-colors">LinkedIn Enhancer</Link></li>
              <li><a href="#faq" className="hover:text-indigo-600 transition-colors">Placement FAQ</a></li>
            </ul>
          </div>

          {/* Column 3: Company & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-widest font-display">Company</h4>
            <ul className="space-y-2 text-xs font-bold text-slate-500">
              <li><a href="#features" className="hover:text-indigo-600 transition-colors">About CareerPilot</a></li>
              <li><a href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing & Plans</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} CareerPilot AI Inc. All rights reserved.</p>

          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer">
              <Globe className="h-4 w-4" />
            </span>
            <span className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer">
              <Share2 className="h-4 w-4" />
            </span>
            <span className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer">
              <Send className="h-4 w-4" />
            </span>
            <span className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer">
              <MessageSquare className="h-4 w-4" />
            </span>

            <button 
              onClick={scrollToTop}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-extrabold transition-all ml-2 cursor-pointer"
            >
              Back to Top <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
