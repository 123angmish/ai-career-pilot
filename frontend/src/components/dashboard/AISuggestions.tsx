import React from 'react';
import { ArrowRight, BookOpen, FileCheck, Sparkles, Link2, Compass } from 'lucide-react';
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
      tagClass: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20',
      icon: <Link2 className="h-4 w-4" />,
      link: '/services/linkedin',
    },
    {
      id: 'interview',
      title: 'Practice 50 Google & GFG Technical Questions',
      description: 'Review word-for-word solutions for Java, Spring Boot, React, SQL, and System Design.',
      tag: 'Interview Prep',
      tagClass: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20',
      icon: <Sparkles className="h-4 w-4" />,
      link: '/interview/questions',
    },
    {
      id: 'salary',
      title: 'Salary Negotiator & Counter-Offer Strategist',
      description: 'Generate high-impact counter-offer email scripts tailored to your parsed resume.',
      tag: 'Salary Boost',
      tagClass: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20',
      icon: <Compass className="h-4 w-4" />,
      link: '/career-path',
    },
    {
      id: 'jd-match',
      title: 'JD Matcher & Keyword Gap Analysis',
      description: 'Compare your resume against target Job Descriptions to catch missing keywords.',
      tag: 'JD Match',
      tagClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
      icon: <FileCheck className="h-4 w-4" />,
      link: '/resumes/jd-match',
    },
    {
      id: 'cover',
      title: 'Generate Tailored Cover Letter',
      description: 'Create personalized cover letters formatted specifically for tech hiring panels.',
      tag: 'Cover Letter',
      tagClass: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20',
      icon: <BookOpen className="h-4 w-4" />,
      link: '/cover-letter',
    },
  ];

  return (
    <DashboardCard className="h-full flex flex-col border border-zinc-200/80 dark:border-zinc-800 rounded-3xl shadow-sm">
      <div className="p-6 space-y-4 flex-1">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-500 animate-pulse" />
          <div>
            <h3 className="font-black text-zinc-900 dark:text-zinc-50 tracking-tight text-base">AI Executive Recommendations</h3>
            <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              Personalized action steps built from your active technical profile.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 pt-1">
          {suggestions.map((sug) => (
            <Link
              key={sug.id}
              to={sug.link}
              className="group flex items-start gap-3 p-3.5 border border-zinc-200/80 dark:border-zinc-800/80 hover:border-blue-500/40 dark:hover:border-blue-500/40 hover:bg-zinc-50 dark:hover:bg-zinc-850/60 rounded-2xl transition-all duration-200 cursor-pointer shadow-2xs"
            >
              <div className="p-2.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors shrink-0">
                {sug.icon}
              </div>
              <div className="flex-1 space-y-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-black text-zinc-900 dark:text-zinc-100 text-xs tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {sug.title}
                  </h4>
                  <span className={`text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${sug.tagClass}`}>
                    {sug.tag}
                  </span>
                </div>
                <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 leading-normal">{sug.description}</p>
              </div>
              <div className="self-center p-1 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0">
                <ArrowRight className="h-4 w-4 text-blue-500" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </DashboardCard>
  );
};

export default AISuggestions;
