import React from 'react';
import { motion } from 'framer-motion';

interface DashboardCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  children,
  className = '',
  onClick,
  hoverEffect = true,
}) => {
  const isClickable = !!onClick;

  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={
        hoverEffect
          ? {
              y: -4,
              boxShadow: '0 12px 30px -10px rgba(0, 0, 0, 0.08)',
              borderColor: 'rgba(99, 102, 241, 0.25)',
            }
          : undefined
      }
      className={`
        relative rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 
        bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md 
        p-6 transition-colors duration-300
        ${isClickable ? 'cursor-pointer select-none' : ''}
        ${className}
      `}
    >
      {/* Subtle top light reflection for glass effect */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-200/40 dark:via-zinc-700/20 to-transparent rounded-t-xl" />
      {children}
    </motion.div>
  );
};

export default DashboardCard;
