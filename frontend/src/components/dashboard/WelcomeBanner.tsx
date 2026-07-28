import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Compass, ShieldCheck, Zap, Video, Database, ArrowRight } from 'lucide-react';
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
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-r from-[#0d1226] via-[#141b36] to-[#0f172a] p-6 md:p-8 text-white shadow-2xl relative group"
    >
      {/* Ambient Animated Blurred Spheres & Glows */}
      <div className="absolute right-0 top-0 -mt-16 -mr-16 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute left-1/3 bottom-0 -mb-20 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-1/4 bottom-0 w-64 h-64 bg-cyan-500/15 rounded-full blur-2xl pointer-events-none" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="relative z-10 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-extrabold uppercase tracking-wider text-indigo-200 shadow-md">
              <Calendar className="h-3.5 w-3.5 text-amber-400" />
              <span>{formattedDate}</span>
              <span className="opacity-40">•</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" /> Enterprise AI Verified
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight select-none font-display text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-indigo-300">
              Welcome back, {firstName} <span className="animate-bounce inline-block">👋</span>
            </h1>

            <p className="text-sm md:text-base text-zinc-300 max-w-2xl font-normal leading-relaxed">
              {motivationalMessage}
            </p>
          </div>

          {/* Quick CTA Action Group */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate('/career-path')}
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-zinc-950 font-extrabold rounded-2xl text-xs transition-all shadow-lg shadow-amber-500/20"
            >
              <Compass className="h-4 w-4" /> Career & Salary Scorecard
              <ArrowRight className="h-3.5 w-3.5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate('/interview/mock')}
              className="flex items-center gap-2 px-4.5 py-3 bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 text-white font-extrabold rounded-2xl text-xs transition-all shadow-md"
            >
              <Video className="h-4 w-4 text-emerald-400" /> Mock Interview
            </motion.button>
          </div>
        </div>

        {/* Live System Performance KPI Bar */}
        <div className="pt-5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold">
          <div className="flex items-center gap-3 bg-white/[0.04] backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10">
            <Zap className="h-4 w-4 text-amber-400 shrink-0" />
            <div>
              <span className="text-[10px] text-zinc-400 block uppercase font-extrabold tracking-wider">ATS Score Engine</span>
              <span className="text-white font-extrabold">98.4% Match Rate</span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/[0.04] backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10">
            <Sparkles className="h-4 w-4 text-cyan-400 shrink-0" />
            <div>
              <span className="text-[10px] text-zinc-400 block uppercase font-extrabold tracking-wider">Recruiter Visibility</span>
              <span className="text-white font-extrabold">Top 1% Rank</span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/[0.04] backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10">
            <Video className="h-4 w-4 text-emerald-400 shrink-0" />
            <div>
              <span className="text-[10px] text-zinc-400 block uppercase font-extrabold tracking-wider">Senior Mentors</span>
              <span className="text-emerald-300 font-extrabold">Google Meet Active</span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/[0.04] backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10">
            <Database className="h-4 w-4 text-indigo-400 shrink-0" />
            <div>
              <span className="text-[10px] text-zinc-400 block uppercase font-extrabold tracking-wider">Database Sync</span>
              <span className="text-indigo-300 font-extrabold">MySQL Cloud Active</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomeBanner;
