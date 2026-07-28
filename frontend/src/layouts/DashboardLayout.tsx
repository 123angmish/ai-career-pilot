import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';

export const DashboardLayout: React.FC = () => {
  // Default to collapsed (symbol/icon-only mode)
  const [isCollapsed, setIsCollapsed] = useState(true);
  const location = useLocation();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F8FAFC] text-slate-800 font-sans relative selection:bg-indigo-500/20 selection:text-indigo-900">
      {/* Background Soft Light Gradient Mesh Blobs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/4 rounded-full blur-[180px] pointer-events-none" />

      {/* Subtle Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

      {/* Icon-Only Collapsed Sidebar by Default */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Main Panel */}
      <div className="flex flex-col flex-1 h-full overflow-hidden z-10">
        {/* Sticky Light Navbar */}
        <Navbar />

        {/* Content canvas with Framer Motion Page Fade+Slide Transitions */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-custom">
          <div className="mx-auto max-w-7xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};
