import React, { useMemo } from 'react';
import { Sparkles, Calendar, Compass, ShieldCheck, Zap, Video, Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface WelcomeBannerProps {
  firstName: string;
}

const CAREER_MESSAGES = [
  "Accelerate your engineering career with AI-driven ATS resume optimization and 1-on-1 senior mentor sessions.",
  "Your career growth trajectory is active. Explore recruiter search-ranked LinkedIn headlines & interview prep.",
  "Small daily optimizations yield exponential offer raises. What engineering milestone will we achieve today?",
  "Perfecting your technical profile is the highest-ROI investment. Let's benchmark your readiness index.",
  "Step into executive-level career engineering. Your CareerPilot AI co-pilot is fully active."
];

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ firstName }) => {
  const navigate = useNavigate();

  const formattedDate = useMemo(() => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date().toLocaleDateString('en-US', options);
  }, []);

  const motivationalMessage = useMemo(() => {
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 1).getTime()) / 86400000);
    return CAREER_MESSAGES[dayOfYear % CAREER_MESSAGES.length];
  }, []);

  return (
    <div className="relative rounded-3xl overflow-hidden border border-brand-200/50 dark:border-brand-900/30 bg-gradient-to-r from-brand-700 via-indigo-700 to-purple-800 dark:from-brand-950 dark:via-indigo-950 dark:to-purple-950 p-6 md:p-8 text-white shadow-xl shadow-brand-500/10">
      {/* Ambient Animated Blurred Spheres */}
      <div className="absolute right-0 top-0 -mt-16 -mr-16 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute left-1/3 bottom-0 -mb-20 w-96 h-96 bg-indigo-500/25 rounded-full blur-3xl" />
      <div className="absolute right-1/4 bottom-0 w-64 h-64 bg-amber-400/15 rounded-full blur-2xl" />

      <div className="relative z-10 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[11px] font-extrabold uppercase tracking-wider text-brand-100">
              <Calendar className="h-3.5 w-3.5 text-amber-300" />
              <span>{formattedDate}</span>
              <span className="opacity-40">•</span>
              <span className="text-emerald-300 flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" /> Enterprise Verified
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-black tracking-tight select-none">
              Welcome back, {firstName} <span className="animate-bounce inline-block">👋</span>
            </h1>

            <p className="text-sm md:text-base text-brand-100/90 max-w-2xl font-normal leading-relaxed">
              {motivationalMessage}
            </p>
          </div>

          {/* Quick CTA Action Group */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => navigate('/career-path')}
              className="flex items-center gap-2 px-5 py-3 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black rounded-2xl text-xs transition-all shadow-lg hover:scale-105 active:scale-95"
            >
              <Compass className="h-4 w-4" /> Career & Salary Scorecard
            </button>

            <button
              onClick={() => navigate('/interview/mock')}
              className="flex items-center gap-2 px-4 py-3 bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 text-white font-extrabold rounded-2xl text-xs transition-all shadow-md hover:scale-105"
            >
              <Video className="h-4 w-4 text-emerald-300" /> Mock Interview
            </button>
          </div>
        </div>

        {/* Live System Performance KPI Bar */}
        <div className="pt-4 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-extrabold">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10">
            <Zap className="h-4 w-4 text-amber-300 shrink-0" />
            <div>
              <span className="text-[10px] text-brand-200 block uppercase font-bold">ATS Score Engine</span>
              <span className="text-white font-black">98.4% Match Rate</span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10">
            <Sparkles className="h-4 w-4 text-cyan-300 shrink-0" />
            <div>
              <span className="text-[10px] text-brand-200 block uppercase font-bold">Recruiter Visibility</span>
              <span className="text-white font-black">Top 1% Tier</span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10">
            <Video className="h-4 w-4 text-emerald-300 shrink-0" />
            <div>
              <span className="text-[10px] text-brand-200 block uppercase font-bold">Senior Mentors</span>
              <span className="text-emerald-300 font-black">Google Meet Active</span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10">
            <Database className="h-4 w-4 text-indigo-300 shrink-0" />
            <div>
              <span className="text-[10px] text-brand-200 block uppercase font-bold">Database Sync</span>
              <span className="text-indigo-200 font-black">MySQL Persistence</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
