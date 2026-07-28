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
      iconBgClass: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30',
    },
    {
      title: 'AI Resume Builder',
      description: 'Build ATS-optimized resumes with 1-click PDF download.',
      icon: <Wand2 className="h-5 w-5" />,
      path: '/resumes/builder',
      iconBgClass: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30',
    },
    {
      title: 'Resume Analysis',
      description: 'Deep dive into your resume layout and language.',
      icon: <LineChart className="h-5 w-5" />,
      path: '/resumes/analysis',
      iconBgClass: 'bg-purple-500/10 text-purple-400 border border-purple-500/30',
    },
    {
      title: 'JD Match',
      description: 'Check how well your resume matches a job description.',
      icon: <FileCheck className="h-5 w-5" />,
      path: '/resumes/jd-match',
      iconBgClass: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30',
    },
    {
      title: 'Cover Letter',
      description: 'Instantly write a highly tailored cover letter.',
      icon: <FileText className="h-5 w-5" />,
      path: '/cover-letter',
      iconBgClass: 'bg-amber-500/10 text-amber-400 border border-amber-500/30',
    },
    {
      title: 'Interview Qs',
      description: 'Generate specific practice questions for any role.',
      icon: <ListChecks className="h-5 w-5" />,
      path: '/interview/questions',
      iconBgClass: 'bg-rose-500/10 text-rose-400 border border-rose-500/30',
    },
    {
      title: 'Mock Interview',
      description: 'Book 1-on-1 sessions with Senior Engineers & Live Chat.',
      icon: <Video className="h-5 w-5" />,
      path: '/interview/mock',
      iconBgClass: 'bg-violet-500/10 text-violet-400 border border-violet-500/30',
    },
    {
      title: 'LinkedIn Enhancer',
      description: 'Connect profile URL for 360° AI Recruiter SEO Audit.',
      icon: <Link2 className="h-5 w-5" />,
      path: '/services/linkedin',
      iconBgClass: 'bg-sky-500/10 text-sky-400 border border-sky-500/30',
    },
    {
      title: 'Courses & Certs',
      description: 'Curated technical tracks & official exam links.',
      icon: <Award className="h-5 w-5" />,
      path: '/services/courses',
      iconBgClass: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30',
    },
    {
      title: 'Global Careers',
      description: 'Visa pathways, global tech agencies & PPP calculator.',
      icon: <Globe className="h-5 w-5" />,
      path: '/services/global-careers',
      iconBgClass: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30',
    },
    {
      title: 'Career & Salary',
      description: '360° Career Readiness Index & Live AI Salary Negotiator.',
      icon: <Compass className="h-5 w-5" />,
      path: '/career-path',
      iconBgClass: 'bg-amber-500/10 text-amber-400 border border-amber-500/30',
    },
    {
      title: 'AI Career Chat',
      description: 'Consult with the CareerPilot AI model on strategies.',
      icon: <MessageSquareCode className="h-5 w-5" />,
      path: '/chat',
      iconBgClass: 'bg-teal-500/10 text-teal-400 border border-teal-500/30',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-extrabold text-white tracking-tight font-display">
          Quick Actions Launchpad
        </h2>
        <span className="text-xs text-zinc-400 select-none">
          Click to launch modules
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: index * 0.04 }}
            whileHover={{ y: -4, scale: 1.02 }}
          >
            <DashboardCard
              onClick={() => navigate(action.path)}
              className="group flex flex-col justify-between h-40 p-5 glass-card glass-card-hover rounded-3xl border border-white/10 cursor-pointer relative overflow-hidden"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-2xl ${action.iconBgClass} shadow-lg shadow-black/40 backdrop-blur-md transition-transform duration-300 group-hover:scale-110`}>
                    {action.icon}
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-zinc-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors font-display">
                  {action.title}
                </h3>
                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
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
