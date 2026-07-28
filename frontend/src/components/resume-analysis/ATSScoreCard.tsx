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
  if (score >= 80) return { label: 'Excellent', color: '#10b981', textColor: 'text-emerald-700', bgColor: 'bg-emerald-50 border border-emerald-200', Icon: TrendingUp };
  if (score >= 60) return { label: 'Good', color: '#f59e0b', textColor: 'text-amber-700', bgColor: 'bg-amber-50 border border-amber-200', Icon: Minus };
  return { label: 'Needs Work', color: '#ef4444', textColor: 'text-rose-700', bgColor: 'bg-rose-50 border border-rose-200', Icon: TrendingDown };
}

export const ATSScoreCard: React.FC<ATSScoreCardProps> = ({ score }) => {
  const config = getScoreConfig(score);
  const chartData = [{ value: score, fill: config.color }];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col items-center gap-4"
    >
      <div className="flex items-center gap-2 self-start">
        <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
          <Zap className="h-4 w-4" />
        </div>
        <h3 className="text-xs font-extrabold text-slate-700 uppercase tracking-widest font-display">
          ATS Score Gauge
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
              background={{ fill: '#f1f5f9' }}
              dataKey="value"
              cornerRadius={12}
              angleAxisId={0}
            />
          </RadialBarChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-black text-slate-900 leading-none font-display">
            {score}
          </span>
          <span className="text-xs text-slate-500 mt-1 font-semibold">out of 100</span>
        </div>
      </div>

      <div className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl ${config.bgColor}`}>
        <config.Icon className={`h-4 w-4 ${config.textColor}`} />
        <span className={`text-sm font-extrabold ${config.textColor}`}>{config.label}</span>
      </div>

      <p className="text-xs text-slate-500 text-center leading-relaxed font-medium">
        ATS score reflects how well your resume matches common applicant tracking system requirements.
      </p>
    </motion.div>
  );
};

export default ATSScoreCard;
