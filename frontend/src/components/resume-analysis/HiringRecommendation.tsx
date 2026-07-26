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
      badgeBg: 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300',
    };
  }
  if (r.includes('consider') || r.includes('potential') || r.includes('maybe')) {
    return {
      label: 'Consider',
      icon: Users,
      gradient: 'from-amber-500 to-orange-600',
      badgeBg: 'bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300',
    };
  }
  return {
    label: 'No Hire',
    icon: UserX,
    gradient: 'from-red-500 to-rose-600',
    badgeBg: 'bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300',
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
      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm"
    >
      {/* Header strip */}
      <div className={`h-2 bg-gradient-to-r ${config.gradient}`} />

      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-sm`}>
            <config.icon className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
              Hiring Recommendation
            </h3>
            <span className={`inline-block text-xs font-bold px-2.5 py-0.5 rounded-full mt-1 ${config.badgeBg}`}>
              {config.label}
            </span>
          </div>
        </div>

        <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed border-l-2 border-zinc-200 dark:border-zinc-700 pl-4">
          {recommendation}
        </p>

        {professionalSummary && (
          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
              Professional Summary
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {professionalSummary}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default HiringRecommendation;
