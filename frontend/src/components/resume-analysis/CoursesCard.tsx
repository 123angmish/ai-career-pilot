import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

interface CoursesCardProps {
  courses?: string[];
}

export const CoursesCard: React.FC<CoursesCardProps> = ({ courses }) => {
  if (!courses || courses.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="bg-white dark:bg-zinc-900 border border-sky-200 dark:border-sky-900/40 rounded-2xl p-6 shadow-sm"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="h-8 w-8 rounded-lg bg-sky-100 dark:bg-sky-950/50 flex items-center justify-center">
          <BookOpen className="h-4 w-4 text-sky-600 dark:text-sky-400" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Recommended Courses</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Upskill your career path</p>
        </div>
      </div>

      <ul className="space-y-2.5">
        {courses.map((course, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.04 * i }}
            className="flex gap-3 items-start p-3 rounded-xl bg-sky-50 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900/30"
          >
            <div className="mt-0.5 h-5 w-5 rounded-full bg-sky-200 dark:bg-sky-800/60 flex items-center justify-center text-sky-700 dark:text-sky-300 text-xs font-bold shrink-0">
              {i + 1}
            </div>
            <span className="text-sm text-zinc-700 dark:text-zinc-300 leading-snug">{course}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default CoursesCard;
