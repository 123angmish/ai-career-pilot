import React from 'react';
import { motion } from 'framer-motion';
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis,
} from 'recharts';
import { Zap, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface ATSScoreCardProps {
  score: number;
}

function getScoreConfig(score: number) {
  if (score >= 80) return { label: 'Excellent', color: '#10b981', textColor: 'text-emerald-600 dark:text-emerald-400', bgColor: 'bg-emerald-50 dark:bg-emerald-950/30', Icon: TrendingUp };
  if (score >= 60) return { label: 'Good', color: '#f59e0b', textColor: 'text-amber-600 dark:text-amber-400', bgColor: 'bg-amber-50 dark:bg-amber-950/30', Icon: Minus };
  return { label: 'Needs Work', color: '#ef4444', textColor: 'text-red-600 dark:text-red-400', bgColor: 'bg-red-50 dark:bg-red-950/30', Icon: TrendingDown };
}

export const ATSScoreCard: React.FC<ATSScoreCardProps> = ({ score }) => {
  const config = getScoreConfig(score);
  const chartData = [{ value: score, fill: config.color }];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col items-center gap-4"
    >
      <div className="flex items-center gap-2 self-start">
        <Zap className="h-4 w-4 text-brand-600 dark:text-brand-400" />
        <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
          ATS Score
        </h3>
      </div>

      <div className="relative w-44 h-44">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius="70%"
            outerRadius="100%"
            data={chartData}
            startAngle={225}
            endAngle={-45}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
            <RadialBar
              background={{ fill: '#f4f4f5' }}
              dataKey="value"
              cornerRadius={12}
              angleAxisId={0}
            />
          </RadialBarChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 leading-none">
            {score}
          </span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">out of 100</span>
        </div>
      </div>

      <div className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl ${config.bgColor}`}>
        <config.Icon className={`h-4 w-4 ${config.textColor}`} />
        <span className={`text-sm font-bold ${config.textColor}`}>{config.label}</span>
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center leading-relaxed">
        ATS score reflects how well your resume matches common applicant tracking system requirements.
      </p>
    </motion.div>
  );
};

export default ATSScoreCard;
