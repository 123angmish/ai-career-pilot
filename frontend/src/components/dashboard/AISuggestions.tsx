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
      tagClass: 'bg-cyan-50 text-cyan-700 border border-cyan-200',
      icon: <Link2 className="h-4 w-4" />,
      link: '/services/linkedin',
    },
    {
      id: 'interview',
      title: 'Practice 50 Google & GFG Technical Questions',
      description: 'Review word-for-word solutions for Java, Spring Boot, React, SQL, and System Design.',
      tag: 'Interview Prep',
      tagClass: 'bg-purple-50 text-purple-700 border border-purple-200',
      icon: <Sparkles className="h-4 w-4" />,
      link: '/interview/questions',
    },
    {
      id: 'salary',
      title: 'Salary Negotiator & Counter-Offer Strategist',
      description: 'Generate high-impact counter-offer email scripts tailored to your parsed resume.',
      tag: 'Salary Boost',
      tagClass: 'bg-amber-50 text-amber-700 border border-amber-200',
      icon: <Compass className="h-4 w-4" />,
      link: '/career-path',
    },
    {
      id: 'jd-match',
      title: 'JD Matcher & Keyword Gap Analysis',
      description: 'Compare your resume against target Job Descriptions to catch missing keywords.',
      tag: 'JD Match',
      tagClass: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
      icon: <FileCheck className="h-4 w-4" />,
      link: '/resumes/jd-match',
    },
    {
      id: 'cover',
      title: 'Generate Tailored Cover Letter',
      description: 'Create personalized cover letters formatted specifically for tech hiring panels.',
      tag: 'Cover Letter',
      tagClass: 'bg-teal-50 text-teal-700 border border-teal-200',
      icon: <BookOpen className="h-4 w-4" />,
      link: '/cover-letter',
    },
  ];

  return (
    <DashboardCard className="h-full flex flex-col bg-white rounded-3xl border border-slate-200 p-6 relative overflow-hidden shadow-sm">
      <div className="space-y-4 flex-1">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 shadow-2xs">
            <Sparkles className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 tracking-tight text-base font-display flex items-center gap-2">
              AI Copilot Suggestions <Bot className="h-4 w-4 text-indigo-600" />
            </h3>
            <p className="text-xs font-medium text-slate-500">
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
                className="group flex items-start gap-3.5 p-3.5 border border-slate-200 hover:border-indigo-300 bg-slate-50/50 hover:bg-slate-50 rounded-2xl transition-all duration-200 cursor-pointer shadow-2xs"
              >
                <div className="p-2.5 bg-white text-slate-700 rounded-xl group-hover:text-indigo-600 border border-slate-200 transition-all shrink-0">
                  {sug.icon}
                </div>
                <div className="flex-1 space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-bold text-slate-900 text-xs tracking-tight group-hover:text-indigo-600 transition-colors">
                      {sug.title}
                    </h4>
                    <span className={`text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${sug.tagClass}`}>
                      {sug.tag}
                    </span>
                  </div>
                  <p className="text-[11px] font-normal text-slate-500 leading-relaxed">{sug.description}</p>
                </div>
                <div className="self-center p-1 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0">
                  <ArrowRight className="h-4 w-4 text-indigo-600" />
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
