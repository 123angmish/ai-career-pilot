import React from 'react';
import { motion } from 'framer-motion';
import { FileCheck, Video, Link2, Compass, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { DashboardCard } from './DashboardCard';
import { useNavigate } from 'react-router-dom';

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  icon: React.ReactNode;
  iconColorClass: string;
  path?: string;
}

export const RecentActivity: React.FC = () => {
  const navigate = useNavigate();
  const savedResume = JSON.parse(localStorage.getItem('cp_resume') || '{}');
  const fileName = savedResume?.fileName || 'Angel_Mishra_Resume.pdf';

  const activities: ActivityItem[] = [
    {
      id: 'linkedin',
      title: 'LinkedIn Profile Audit Completed',
      description: 'Parsed handle @angel-mishra. Recruiter SEO Score: 94/100.',
      timestamp: '10m ago',
      icon: <Link2 className="h-4 w-4" />,
      iconColorClass: 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30',
      path: '/services/linkedin'
    },
    {
      id: 'mock',
      title: '1-on-1 Mock Session Scheduled',
      description: 'Senior Principal Engineer panel booked. Live Chat & Meet links generated.',
      timestamp: '1h ago',
      icon: <Video className="h-4 w-4" />,
      iconColorClass: 'text-purple-400 bg-purple-500/10 border border-purple-500/30',
      path: '/interview/mock'
    },
    {
      id: 'salary',
      title: 'Career & Salary Scorecard Generated',
      description: '360° Readiness Score: 88/100 (Top 5% Tier). Counter-offer script created.',
      timestamp: '3h ago',
      icon: <Compass className="h-4 w-4" />,
      iconColorClass: 'text-amber-400 bg-amber-500/10 border border-amber-500/30',
      path: '/career-path'
    },
    {
      id: 'ats',
      title: 'ATS Resume Parsing & Analysis',
      description: `Parsed ${fileName}. Overall ATS Score: 92/100. 14 key strengths verified.`,
      timestamp: '15h ago',
      icon: <FileCheck className="h-4 w-4" />,
      iconColorClass: 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/30',
      path: '/resumes/analysis'
    }
  ];

  return (
    <DashboardCard className="h-full flex flex-col glass-card rounded-3xl border border-white/10 p-6 relative overflow-hidden">
      <div className="space-y-4 flex-1">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-white tracking-tight text-base flex items-center gap-2 font-display">
              Recent Activity <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            </h3>
            <p className="text-xs text-zinc-400 font-medium">Your verified live executive progress stream.</p>
          </div>
        </div>

        <div className="relative pl-6 space-y-5 before:absolute before:left-[11px] before:top-3 before:bottom-3 before:w-0.5 before:bg-white/10 pt-2">
          {activities.map((act, index) => (
            <motion.div
              key={act.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => act.path && navigate(act.path)}
              className="relative flex gap-4 items-start text-sm group cursor-pointer p-3 rounded-2xl bg-white/[0.02] hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
            >
              <div className={`absolute -left-6 p-2 rounded-xl ${act.iconColorClass} z-10 shadow-lg shadow-black/40 backdrop-blur-md transition-transform group-hover:scale-110`}>
                {act.icon}
              </div>
              <div className="flex-1 space-y-1 pl-3">
                <div className="flex justify-between items-center gap-2">
                  <h4 className="font-bold text-white text-xs group-hover:text-indigo-300 transition-colors flex items-center gap-1">
                    {act.title}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400" />
                  </h4>
                  <span className="text-[10px] font-mono text-zinc-500 whitespace-nowrap">{act.timestamp}</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-normal">{act.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardCard>
  );
};

export default RecentActivity;
