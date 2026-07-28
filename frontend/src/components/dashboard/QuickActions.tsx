import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  Globe,
  ArrowUpRight
} from 'lucide-react';
import { DashboardCard } from './DashboardCard';

interface ActionItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
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
      iconBgClass: 'bg-indigo-50 text-indigo-600 border border-indigo-100',
    },
    {
      title: 'AI Resume Builder',
      description: 'Build ATS-optimized resumes with 1-click PDF download.',
      icon: <Wand2 className="h-5 w-5" />,
      path: '/resumes/builder',
      iconBgClass: 'bg-cyan-50 text-cyan-600 border border-cyan-100',
    },
    {
      title: 'Resume Analysis',
      description: 'Deep dive into your resume layout and language.',
      icon: <LineChart className="h-5 w-5" />,
      path: '/resumes/analysis',
      iconBgClass: 'bg-purple-50 text-purple-600 border border-purple-100',
    },
    {
      title: 'JD Match',
      description: 'Check how well your resume matches a job description.',
      icon: <FileCheck className="h-5 w-5" />,
      path: '/resumes/jd-match',
      iconBgClass: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
    },
    {
      title: 'Cover Letter',
      description: 'Instantly write a highly tailored cover letter.',
      icon: <FileText className="h-5 w-5" />,
      path: '/cover-letter',
      iconBgClass: 'bg-amber-50 text-amber-600 border border-amber-100',
    },
    {
      title: 'Interview Qs',
      description: 'Generate specific practice questions for any role.',
      icon: <ListChecks className="h-5 w-5" />,
      path: '/interview/questions',
      iconBgClass: 'bg-rose-50 text-rose-600 border border-rose-100',
    },
    {
      title: 'Mock Interview',
      description: 'Book 1-on-1 sessions with Senior Engineers & Live Chat.',
      icon: <Video className="h-5 w-5" />,
      path: '/interview/mock',
      iconBgClass: 'bg-violet-50 text-violet-600 border border-violet-100',
    },
    {
      title: 'LinkedIn Enhancer',
      description: 'Connect profile URL for 360° AI Recruiter SEO Audit.',
      icon: <Link2 className="h-5 w-5" />,
      path: '/services/linkedin',
      iconBgClass: 'bg-sky-50 text-sky-600 border border-sky-100',
    },
    {
      title: 'Courses & Certs',
      description: 'Curated technical tracks & official exam links.',
      icon: <Award className="h-5 w-5" />,
      path: '/services/courses',
      iconBgClass: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
    },
    {
      title: 'Global Careers',
      description: 'Visa pathways, global tech agencies & PPP calculator.',
      icon: <Globe className="h-5 w-5" />,
      path: '/services/global-careers',
      iconBgClass: 'bg-indigo-50 text-indigo-600 border border-indigo-100',
    },
    {
      title: 'Career & Salary',
      description: '360° Career Readiness Index & Live AI Salary Negotiator.',
      icon: <Compass className="h-5 w-5" />,
      path: '/career-path',
      iconBgClass: 'bg-amber-50 text-amber-600 border border-amber-100',
    },
    {
      title: 'AI Career Chat',
      description: 'Consult with the CareerPilot AI model on strategies.',
      icon: <MessageSquareCode className="h-5 w-5" />,
      path: '/chat',
      iconBgClass: 'bg-teal-50 text-teal-600 border border-teal-100',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-extrabold text-slate-900 tracking-tight font-display">
          Quick Actions Launchpad
        </h2>
        <span className="text-xs text-slate-500 font-medium select-none">
          Click to launch modules
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: index * 0.03 }}
            whileHover={{ y: -3, scale: 1.01 }}
          >
            <DashboardCard
              onClick={() => navigate(action.path)}
              className="group flex flex-col justify-between h-40 p-5 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all cursor-pointer relative overflow-hidden"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-2xl ${action.iconBgClass} shadow-2xs transition-transform duration-300 group-hover:scale-110`}>
                    {action.icon}
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors font-display">
                  {action.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-normal">
                  {action.description}
                </p>
              </div>
            </DashboardCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
