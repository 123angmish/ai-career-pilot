import React from 'react';
import { FileCheck, Video, Link2, Compass, CheckCircle2 } from 'lucide-react';
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
      title: 'LinkedIn Real ID Extracted & Audited',
      description: 'Parsed handle @angel-mishra. Recruiter SEO Score: 94/100.',
      timestamp: '10m ago',
      icon: <Link2 className="h-4 w-4" />,
      iconColorClass: 'text-sky-600 dark:text-sky-400 bg-sky-500/10 border border-sky-500/20',
      path: '/services/linkedin'
    },
    {
      id: 'mock',
      title: '1-on-1 Mock Session Scheduled',
      description: 'Senior Principal Engineer panel booked. Live Chat & Meet links generated.',
      timestamp: '1h ago',
      icon: <Video className="h-4 w-4" />,
      iconColorClass: 'text-purple-600 dark:text-purple-400 bg-purple-500/10 border border-purple-500/20',
      path: '/interview/mock'
    },
    {
      id: 'salary',
      title: 'Career & Salary Scorecard Generated',
      description: '360° Readiness Score: 88/100 (Top 5% Tier). Tailored counter-offer script created.',
      timestamp: '3h ago',
      icon: <Compass className="h-4 w-4" />,
      iconColorClass: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20',
      path: '/career-path'
    },
    {
      id: 'ats',
      title: 'ATS Resume Parsing & Analysis',
      description: `Parsed ${fileName}. Overall ATS Score: 92/100. 14 key strengths verified.`,
      timestamp: '15h ago',
      icon: <FileCheck className="h-4 w-4" />,
      iconColorClass: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20',
      path: '/resumes/analysis'
    }
  ];

  return (
    <DashboardCard className="h-full flex flex-col border border-zinc-200/80 dark:border-zinc-800 rounded-3xl shadow-sm">
      <div className="p-6 space-y-4 flex-1">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-black text-zinc-900 dark:text-zinc-50 tracking-tight text-base flex items-center gap-2">
              Recent Activity <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold">Your verified live executive progress timeline.</p>
          </div>
        </div>

        <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-200 dark:before:bg-zinc-800 pt-2">
          {activities.map((act) => (
            <div
              key={act.id}
              onClick={() => act.path && navigate(act.path)}
              className="relative flex gap-4 items-start text-sm group cursor-pointer p-2 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-850/60 transition-colors"
            >
              <div className={`absolute -left-6 p-2 rounded-xl ${act.iconColorClass} z-10 shadow-sm transition-transform group-hover:scale-110`}>
                {act.icon}
              </div>
              <div className="flex-1 space-y-0.5 pl-2">
                <div className="flex justify-between items-baseline gap-2">
                  <h4 className="font-extrabold text-zinc-900 dark:text-zinc-100 text-xs group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {act.title}
                  </h4>
                  <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 whitespace-nowrap">{act.timestamp}</span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">{act.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardCard>
  );
};

export default RecentActivity;
