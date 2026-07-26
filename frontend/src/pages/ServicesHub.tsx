import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Link2, 
  Award, 
  MessageSquare, 
  Globe, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Card } from '../components/ui/Card';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  badge: string;
  colorClass: string;
  bgClass: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: 'resume',
    title: 'Resume Writing & ATS Audit',
    description: 'AI-powered resume builder, ATS keyword scoring, and high-definition PDF downloader.',
    icon: <FileText className="h-6 w-6" />,
    path: '/resumes/builder',
    badge: 'Popular',
    colorClass: 'text-blue-600 dark:text-blue-400',
    bgClass: 'bg-blue-500/10 border-blue-500/20'
  },
  {
    id: 'linkedin',
    title: 'LinkedIn Profile Enhancement',
    description: 'Recruiter search-ranked headlines, executive About summaries, and technical skill badges.',
    icon: <Link2 className="h-6 w-6" />,
    path: '/services/linkedin',
    badge: 'Trending',
    colorClass: 'text-sky-600 dark:text-sky-400',
    bgClass: 'bg-sky-500/10 border-sky-500/20'
  },
  {
    id: 'courses',
    title: 'Courses & Certification Hub',
    description: 'Curated technical tracks, cloud certification exam roadmaps, and salary boost benchmarks.',
    icon: <Award className="h-6 w-6" />,
    path: '/services/courses',
    badge: 'High Impact',
    colorClass: 'text-emerald-600 dark:text-emerald-400',
    bgClass: 'bg-emerald-500/10 border-emerald-500/20'
  },
  {
    id: 'interview',
    title: 'Interview Preparation',
    description: '50-Question authentic Google/GFG interview banks, live 1-on-1 chat, and Google Meet senior engineer sessions.',
    icon: <MessageSquare className="h-6 w-6" />,
    path: '/interview/questions',
    badge: 'Essential',
    colorClass: 'text-purple-600 dark:text-purple-400',
    bgClass: 'bg-purple-500/10 border-purple-500/20'
  },
  {
    id: 'global',
    title: 'International Study & Careers',
    description: 'Visa-sponsoring global tech hubs (USA, Germany, UK, Canada) and USD remote compensation calculator.',
    icon: <Globe className="h-6 w-6" />,
    path: '/services/global-careers',
    badge: 'Global',
    colorClass: 'text-indigo-600 dark:text-indigo-400',
    bgClass: 'bg-indigo-500/10 border-indigo-500/20'
  }
];

export const ServicesHub: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500 max-w-6xl mx-auto">
      {/* Hero Banner */}
      <div className="relative rounded-3xl p-8 md:p-10 bg-gradient-to-r from-brand-600 via-indigo-700 to-purple-800 text-white shadow-xl overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-brand-200">
            <Sparkles className="h-3.5 w-3.5" /> CareerPilot Professional Engineering Suite
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">Our Premium Career Services</h1>
          <p className="text-brand-100/90 text-sm md:text-base max-w-2xl leading-relaxed">
            Everything you need to level up your engineering career—from AI Resume Writing and LinkedIn SEO to 1-on-1 Senior Engineer Mock Interviews and Global Relocation.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((svc) => (
          <Card
            key={svc.id}
            onClick={() => navigate(svc.path)}
            className="group border border-zinc-200/80 dark:border-zinc-800 rounded-3xl shadow-sm hover:shadow-xl hover:border-brand-500/50 transition-all cursor-pointer flex flex-col justify-between p-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-2xl border ${svc.bgClass} ${svc.colorClass}`}>
                  {svc.icon}
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${svc.bgClass} ${svc.colorClass}`}>
                  {svc.badge}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-black text-zinc-900 dark:text-zinc-50 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {svc.title}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed font-medium">
                  {svc.description}
                </p>
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
              <span className="text-xs font-black text-brand-600 dark:text-brand-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                Explore Service <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServicesHub;
