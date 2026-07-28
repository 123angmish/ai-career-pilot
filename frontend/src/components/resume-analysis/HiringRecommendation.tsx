import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, UserX, Users } from 'lucide-react';

interface HiringRecommendationProps {
  recommendation: string;
  professionalSummary?: string;
}

function getHiringConfig(rec: string) {
  const r = rec?.toLowerCase() ?? '';
  if (r.includes('strong') || r.includes('highly') || r.includes('recommend')) {
    return {
      label: 'Strong Hire',
      icon: UserCheck,
      gradient: 'from-emerald-500 to-teal-600',
      badgeBg: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
    };
  }
  if (r.includes('consider') || r.includes('potential') || r.includes('maybe')) {
    return {
      label: 'Consider',
      icon: Users,
      gradient: 'from-amber-500 to-orange-600',
      badgeBg: 'bg-amber-50 text-amber-800 border border-amber-200',
    };
  }
  return {
    label: 'No Hire',
    icon: UserX,
    gradient: 'from-rose-500 to-red-600',
    badgeBg: 'bg-rose-50 text-rose-800 border border-rose-200',
  };
}

export const HiringRecommendation: React.FC<HiringRecommendationProps> = ({
  recommendation,
  professionalSummary,
}) => {
  const config = getHiringConfig(recommendation);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.35 }}
      className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm"
    >
      {/* Header strip */}
      <div className={`h-2 bg-gradient-to-r ${config.gradient}`} />

      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className={`h-10 w-10 rounded-2xl bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-sm`}>
            <config.icon className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-widest font-display">
              Hiring Recommendation
            </h3>
            <span className={`inline-block text-xs font-extrabold px-3 py-0.5 rounded-full mt-1 ${config.badgeBg}`}>
              {config.label}
            </span>
          </div>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed border-l-2 border-indigo-200 pl-4 font-medium">
          {recommendation}
        </p>

        {professionalSummary && (
          <div className="pt-3 border-t border-slate-100">
            <p className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-2">
              Professional Summary
            </p>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              {professionalSummary}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default HiringRecommendation;
