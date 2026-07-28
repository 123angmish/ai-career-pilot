import React from 'react';
import { Outlet, Navigate, Link } from 'react-router-dom';
import { Sparkles, Trophy, ShieldCheck, Zap, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthLayout: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // If already authenticated, redirect immediately to dashboard
  if (!isLoading && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex min-h-screen w-screen bg-[#F8FAFC] text-slate-800 font-sans select-none">
      {/* Left side: Premium Light Marketing Sideboard */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-50/80 via-purple-50/50 to-white text-slate-800 p-12 flex-col justify-between relative overflow-hidden border-r border-slate-200">
        {/* Ambient Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        {/* Logo */}
        <div className="flex items-center justify-between relative z-10">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-2xl bg-indigo-600 text-white font-bold shadow-md shadow-indigo-500/20">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="tracking-tight font-extrabold text-xl text-slate-900 font-display">CareerPilot</span>
          </Link>
          <Link to="/" className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>

        {/* Value Proposition */}
        <div className="max-w-md my-auto relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-100/80 border border-indigo-200 text-indigo-800 text-xs font-extrabold uppercase tracking-widest">
            <Sparkles className="h-3.5 w-3.5" /> Next-Gen AI Career SaaS
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight leading-tight text-slate-900 font-display">
            Accelerate your career with AI placement intelligence.
          </h1>
          <p className="text-slate-600 text-base leading-relaxed font-medium">
            Create ATS-ranked resumes, simulate technical interview loops with senior mentors, and generate tailored cover letters.
          </p>

          <div className="space-y-4 pt-2">
            <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
                <Trophy className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">ATS Score & Keyword Optimization</h4>
                <p className="text-slate-500 text-xs font-medium">Tailor your resume against exact JD keywords for recruiter ranking.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="p-2 rounded-xl bg-violet-50 text-violet-600 border border-violet-100">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Real-time Technical Mock Loops</h4>
                <p className="text-slate-500 text-xs font-medium">Receive detailed speech & syntax feedback on Google, Meta & Amazon questions.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Enterprise Student Placement Verified</h4>
                <p className="text-slate-500 text-xs font-medium">Executive-level formatting & ATS layout compliance.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Quote */}
        <div className="relative z-10 border-t border-slate-200 pt-6">
          <blockquote className="text-xs text-slate-600 italic leading-relaxed font-medium">
            "CareerPilot streamlined my job application workflow. The AI matcher was accurate down to the skill level, helping me land senior engineer offers."
          </blockquote>
          <p className="text-xs text-slate-900 font-extrabold mt-2 not-italic">— Alex Carter, Senior Software Engineer</p>
        </div>
      </div>

      {/* Right side: Focused Form Container */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-[#F8FAFC]">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
