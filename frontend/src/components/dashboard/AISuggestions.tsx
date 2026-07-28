import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, FileCheck, Sparkles, Link2, Compass, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DashboardCard } from './DashboardCard';

interface Suggestion {
  id: string;
  title: string;
  description: string;
  tag: string;
  tagClass: string;
  icon: React.ReactNode;
  link: string;
}

export const AISuggestions: React.FC = () => {
  const suggestions: Suggestion[] = [
    {
      id: 'linkedin',
      title: 'LinkedIn Profile SEO Optimization',
      description: 'Audit your handle @angel-mishra and rank top 1% in recruiter search visibility.',
      tag: 'LinkedIn SEO',
      tagClass: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30',
      icon: <Link2 className="h-4 w-4" />,
      link: '/services/linkedin',
    },
    {
      id: 'interview',
      title: 'Practice 50 Google & GFG Technical Questions',
      description: 'Review word-for-word solutions for Java, Spring Boot, React, SQL, and System Design.',
      tag: 'Interview Prep',
      tagClass: 'bg-purple-500/10 text-purple-400 border border-purple-500/30',
      icon: <Sparkles className="h-4 w-4" />,
      link: '/interview/questions',
    },
    {
      id: 'salary',
      title: 'Salary Negotiator & Counter-Offer Strategist',
      description: 'Generate high-impact counter-offer email scripts tailored to your parsed resume.',
      tag: 'Salary Boost',
      tagClass: 'bg-amber-500/10 text-amber-400 border border-amber-500/30',
      icon: <Compass className="h-4 w-4" />,
      link: '/career-path',
    },
    {
      id: 'jd-match',
      title: 'JD Matcher & Keyword Gap Analysis',
      description: 'Compare your resume against target Job Descriptions to catch missing keywords.',
      tag: 'JD Match',
      tagClass: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30',
      icon: <FileCheck className="h-4 w-4" />,
      link: '/resumes/jd-match',
    },
    {
      id: 'cover',
      title: 'Generate Tailored Cover Letter',
      description: 'Create personalized cover letters formatted specifically for tech hiring panels.',
      tag: 'Cover Letter',
      tagClass: 'bg-teal-500/10 text-teal-400 border border-teal-500/30',
      icon: <BookOpen className="h-4 w-4" />,
      link: '/cover-letter',
    },
  ];

  return (
    <DashboardCard className="h-full flex flex-col glass-card rounded-3xl border border-white/10 p-6 relative overflow-hidden">
      <div className="space-y-4 flex-1">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-indigo-500/20 border border-amber-500/30 text-amber-400 shadow-lg shadow-amber-500/10">
            <Sparkles className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-extrabold text-white tracking-tight text-base font-display flex items-center gap-2">
              AI Copilot Suggestions <Bot className="h-4 w-4 text-indigo-400" />
            </h3>
            <p className="text-xs font-medium text-zinc-400">
              Personalized high-impact actions from your parsed tech profile.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 pt-1">
          {suggestions.map((sug, index) => (
            <motion.div
              key={sug.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
            >
              <Link
                to={sug.link}
                className="group flex items-start gap-3.5 p-3.5 border border-white/10 hover:border-indigo-500/40 bg-white/[0.02] hover:bg-white/5 rounded-2xl transition-all duration-200 cursor-pointer shadow-lg shadow-black/20"
              >
                <div className="p-2.5 bg-white/5 text-zinc-300 rounded-xl group-hover:text-indigo-300 group-hover:bg-indigo-500/20 border border-white/5 group-hover:border-indigo-500/30 transition-all shrink-0">
                  {sug.icon}
                </div>
                <div className="flex-1 space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-bold text-white text-xs tracking-tight group-hover:text-indigo-300 transition-colors">
                      {sug.title}
                    </h4>
                    <span className={`text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${sug.tagClass}`}>
                      {sug.tag}
                    </span>
                  </div>
                  <p className="text-[11px] font-normal text-zinc-400 leading-relaxed">{sug.description}</p>
                </div>
                <div className="self-center p-1 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0">
                  <ArrowRight className="h-4 w-4 text-indigo-400" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardCard>
  );
};

export default AISuggestions;
