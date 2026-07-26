import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UploadCloud, 
  LineChart, 
  FileCheck, 
  FileText, 
  ListChecks, 
  Video, 
  MessageSquareCode,
  Compass,
  Wand2,
  Link2,
  Award,
  Globe
} from 'lucide-react';
import { DashboardCard } from './DashboardCard';

interface ActionItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  colorClass: string;
  iconBgClass: string;
}

export const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  const actions: ActionItem[] = [
    {
      title: 'Upload Resume',
      description: 'Upload your resume to get parsed and scored.',
      icon: <UploadCloud className="h-5 w-5" />,
      path: '/resumes/upload',
      colorClass: 'group-hover:text-blue-500',
      iconBgClass: 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400',
    },
    {
      title: 'AI Resume Builder',
      description: 'Build ATS-optimized resumes with 1-click PDF download.',
      icon: <Wand2 className="h-5 w-5" />,
      path: '/resumes/builder',
      colorClass: 'group-hover:text-cyan-500',
      iconBgClass: 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400',
    },
    {
      title: 'Resume Analysis',
      description: 'Deep dive into your resume layout and language.',
      icon: <LineChart className="h-5 w-5" />,
      path: '/resumes/analysis',
      colorClass: 'group-hover:text-indigo-500',
      iconBgClass: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400',
    },
    {
      title: 'JD Match',
      description: 'Check how well your resume matches a job description.',
      icon: <FileCheck className="h-5 w-5" />,
      path: '/resumes/jd-match',
      colorClass: 'group-hover:text-emerald-500',
      iconBgClass: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400',
    },
    {
      title: 'Cover Letter',
      description: 'Instantly write a highly tailored cover letter.',
      icon: <FileText className="h-5 w-5" />,
      path: '/cover-letter',
      colorClass: 'group-hover:text-amber-500',
      iconBgClass: 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400',
    },
    {
      title: 'Interview Qs',
      description: 'Generate specific practice questions for any role.',
      icon: <ListChecks className="h-5 w-5" />,
      path: '/interview/questions',
      colorClass: 'group-hover:text-rose-500',
      iconBgClass: 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400',
    },
    {
      title: 'Mock Interview',
      description: 'Book 1-on-1 sessions with Senior Engineers & Live Chat.',
      icon: <Video className="h-5 w-5" />,
      path: '/interview/mock',
      colorClass: 'group-hover:text-violet-500',
      iconBgClass: 'bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400',
    },
    {
      title: 'LinkedIn Enhancer',
      description: 'Connect profile URL for 360° AI Recruiter SEO Audit.',
      icon: <Link2 className="h-5 w-5" />,
      path: '/services/linkedin',
      colorClass: 'group-hover:text-sky-500',
      iconBgClass: 'bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400',
    },
    {
      title: 'Courses & Certs',
      description: 'Curated technical tracks & official exam links.',
      icon: <Award className="h-5 w-5" />,
      path: '/services/courses',
      colorClass: 'group-hover:text-emerald-500',
      iconBgClass: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400',
    },
    {
      title: 'Global Careers',
      description: 'Visa pathways, global tech agencies & PPP calculator.',
      icon: <Globe className="h-5 w-5" />,
      path: '/services/global-careers',
      colorClass: 'group-hover:text-indigo-500',
      iconBgClass: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400',
    },
    {
      title: 'Career & Salary',
      description: '360° Career Readiness Index & Live AI Salary Negotiator.',
      icon: <Compass className="h-5 w-5" />,
      path: '/career-path',
      colorClass: 'group-hover:text-amber-500',
      iconBgClass: 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400',
    },
    {
      title: 'AI Career Chat',
      description: 'Consult with the CareerPilot AI model on strategies.',
      icon: <MessageSquareCode className="h-5 w-5" />,
      path: '/chat',
      colorClass: 'group-hover:text-teal-500',
      iconBgClass: 'bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
          Quick Actions Launchpad
        </h2>
        <span className="text-xs text-zinc-400 dark:text-zinc-500 select-none">
          Click to launch modules
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <DashboardCard
            key={index}
            onClick={() => navigate(action.path)}
            className="group flex flex-col justify-between h-40 p-5 hover:border-zinc-300 dark:hover:border-zinc-700 cursor-pointer"
          >
            <div className="space-y-2">
              <div className={`p-2.5 w-10 h-10 flex items-center justify-center rounded-xl ${action.iconBgClass} transition-colors duration-300`}>
                {action.icon}
              </div>
              <h3 className={`text-sm font-semibold text-zinc-900 dark:text-zinc-50 transition-colors duration-300 ${action.colorClass}`}>
                {action.title}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                {action.description}
              </p>
            </div>
          </DashboardCard>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
