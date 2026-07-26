import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Sparkles, Trophy, ShieldCheck, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthLayout: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // If already authenticated, redirect immediately to dashboard
  if (!isLoading && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex min-h-screen w-screen bg-zinc-50 dark:bg-zinc-950 font-sans">
      {/* Left side: Premium Marketing Sideboard (Hidden on small screens) */}
      <div className="hidden lg:flex lg:w-1/2 bg-zinc-900 dark:bg-black text-white p-12 flex-col justify-between relative overflow-hidden select-none border-r border-zinc-800">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Logo */}
        <div className="flex items-center gap-2 relative z-10">
          <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-brand-500 text-white font-bold">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="tracking-tight font-bold text-lg text-zinc-100">CareerPilot</span>
        </div>

        {/* Value Proposition */}
        <div className="max-w-md my-auto relative z-10">
          <h1 className="text-4xl font-extrabold tracking-tight leading-tight mb-6">
            Accelerate your career with AI intelligence.
          </h1>
          <p className="text-zinc-400 text-lg mb-8">
            Create high-converting resumes, simulate technical interview loops, and generate tailored cover letters.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-1 rounded-md bg-zinc-800 text-brand-400">
                <Trophy className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-zinc-200">ATS Optimization</h4>
                <p className="text-zinc-450 text-sm">Tailor your resume against exact job keywords.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-1 rounded-md bg-zinc-800 text-brand-400">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-zinc-200">Real-time Simulations</h4>
                <p className="text-zinc-450 text-sm">Receive detailed speech & syntax analysis for mock answers.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-1 rounded-md bg-zinc-800 text-brand-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-zinc-200">Enterprise Standard</h4>
                <p className="text-zinc-450 text-sm">Professional formatting tailored for recruiters.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Quote */}
        <div className="relative z-10 border-t border-zinc-800 pt-6">
          <blockquote className="text-sm text-zinc-400 italic">
            "CareerPilot streamlined my job application workflow. The AI matcher was accurate down to the skill level, helping me land interviews at Vercel and Linear."
          </blockquote>
          <p className="text-xs text-zinc-500 font-semibold mt-2 not-italic">— Alex Carter, Software Engineer</p>
        </div>
      </div>

      {/* Right side: Focused Form Container */}
      <div className="flex-1 flex items-center justify-center p-8 bg-zinc-50 dark:bg-zinc-950">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
