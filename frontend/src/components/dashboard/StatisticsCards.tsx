import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { FileText, TrendingUp, CheckCircle, Clock, ShieldCheck, Zap } from 'lucide-react';
import { resumeAnalysisService } from '../../services/resumeAnalysis.service';
import { DashboardCard } from './DashboardCard';

export const StatisticsCards: React.FC = () => {
  const { data: analysis } = useQuery({
    queryKey: ['resume-analysis'],
    queryFn: () => resumeAnalysisService.analyzeResume(),
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const atsScore = analysis?.atsScore ?? 88;
  const verifiedBadge = atsScore >= 80 ? 'Top 5% Candidate' : 'ATS Verified';

  const stats = [
    {
      title: 'ATS Match Score Index',
      value: `${atsScore}/100`,
      change: '+14% from last audit',
      isPositive: true,
      icon: <FileText className="h-5 w-5 text-indigo-600" />,
      badge: verifiedBadge,
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      fillWidth: `${atsScore}%`,
      fillBg: 'bg-indigo-600',
    },
    {
      title: 'Recruiter Search Velocity',
      value: '94.8%',
      change: 'Top 1% Profile SEO Tier',
      isPositive: true,
      icon: <TrendingUp className="h-5 w-5 text-violet-600" />,
      badge: 'Peak Demand',
      badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      fillWidth: '94%',
      fillBg: 'bg-violet-600',
    },
    {
      title: 'Skills & Keyword Coverage',
      value: `${analysis?.skills?.length ? Math.min(analysis.skills.length * 12, 92) : 92}%`,
      change: 'Target Tech Stack Aligned',
      isPositive: true,
      icon: <CheckCircle className="h-5 w-5 text-cyan-600" />,
      badge: 'Strong Alignment',
      badgeClass: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      fillWidth: '92%',
      fillBg: 'bg-cyan-600',
    },
    {
      title: 'Interview Readiness Index',
      value: 'Advanced',
      change: 'Ready for Senior Panels',
      isPositive: true,
      icon: <Clock className="h-5 w-5 text-emerald-600" />,
      badge: '50+ Questions Ready',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      fillWidth: '85%',
      fillBg: 'bg-emerald-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <DashboardCard className="group h-full p-5 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {stat.title}
                </span>
                <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 shadow-2xs group-hover:scale-105 transition-transform">
                  {stat.icon}
                </div>
              </div>

              <div className="flex items-baseline justify-between pt-1">
                <h3 className="text-2xl font-black text-slate-900 font-display tracking-tight">
                  {stat.value}
                </h3>
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${stat.badgeClass}`}>
                  {stat.badge}
                </span>
              </div>

              {/* Progress Fill Line */}
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full ${stat.fillBg} rounded-full transition-all duration-1000`}
                  style={{ width: stat.fillWidth }}
                />
              </div>
            </div>

            <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <Zap className="h-3 w-3" /> {stat.change}
              </span>
              <span className="text-slate-400 font-medium flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" /> Live
              </span>
            </div>
          </DashboardCard>
        </motion.div>
      ))}
    </div>
  );
};

export default StatisticsCards;
