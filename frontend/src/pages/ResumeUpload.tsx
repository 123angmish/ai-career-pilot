import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  BarChart3, 
  Workflow, 
  AlertCircle, 
  CheckCircle2, 
  X,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { resumeService } from '../services/resume.service';
import { UploadZone } from '../components/resume/UploadZone';
import { UploadProgress } from '../components/resume/UploadProgress';
import { ResumeCard } from '../components/resume/ResumeCard';
import { EmptyUploadState } from '../components/resume/EmptyUploadState';
import { Button } from '../components/ui/Button';

interface ToastMessage {
  id: string;
  type: 'success' | 'error';
  text: string;
}

export const ResumeUpload: React.FC = () => {
  const queryClient = useQueryClient();
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadingFileName, setUploadingFileName] = useState('');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Show modern toast notification helper
  const showToast = (type: 'success' | 'error', text: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // 1. Fetch User's Resume
  const { 
    data: resume, 
    isLoading: isFetchingResume,
    error: fetchError
  } = useQuery({
    queryKey: ['myResume'],
    queryFn: () => resumeService.getMyResume(),
  });

  // 2. Upload Mutation
  const uploadMutation = useMutation({
    mutationFn: ({ file, onProgress }: { file: File; onProgress: (pct: number) => void }) => 
      resumeService.uploadResume(file, onProgress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myResume'] });
      showToast('success', 'Resume uploaded successfully.');
      setShowUploadForm(false);
      setUploadProgress(0);
      setUploadingFileName('');
    },
    onError: (error: any) => {
      const errMsg = error?.response?.data?.message || error?.message || 'Upload failed. Please try again.';
      showToast('error', errMsg);
      setUploadProgress(0);
      setUploadingFileName('');
    }
  });

  // 3. Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => resumeService.deleteResume(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myResume'] });
      showToast('success', 'Resume deleted successfully.');
      setShowUploadForm(false);
    },
    onError: (error: any) => {
      showToast('error', error?.response?.data?.message || 'Failed to delete resume.');
    }
  });

  // Action Handlers
  const handleFileSelect = (file: File) => {
    setUploadingFileName(file.name);
    setUploadProgress(0);
    uploadMutation.mutate({ 
      file, 
      onProgress: (percent) => setUploadProgress(percent) 
    });
  };

  const handleDownload = async () => {
    if (!resume) return;
    try {
      setIsDownloading(true);
      const blob = await resumeService.downloadResume(resume.id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = resume.fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      showToast('error', 'Failed to download file.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDelete = () => {
    if (!resume) return;
    if (window.confirm('Are you sure you want to delete your active resume? This will remove your ATS score and analysis.')) {
      deleteMutation.mutate(resume.id);
    }
  };

  const handleReplace = (file: File) => {
    setUploadingFileName(file.name);
    setUploadProgress(0);
    uploadMutation.mutate({ 
      file, 
      onProgress: (percent) => setUploadProgress(percent) 
    });
  };

  const isUploading = uploadMutation.isPending;

  return (
    <div className="space-y-8 max-w-4xl pb-10 animate-in fade-in duration-500 relative">
      
      {/* Toast Notification Container */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 max-w-sm pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.9 }}
              className={`
                pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg backdrop-blur-md
                ${
                  toast.type === 'success'
                    ? 'border-emerald-200 bg-emerald-50/90 text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/90 dark:text-emerald-300'
                    : 'border-red-200 bg-red-50/90 text-red-800 dark:border-red-900/60 dark:bg-red-950/90 dark:text-red-300'
                }
              `}
            >
              {toast.type === 'success' ? (
                <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              )}
              <div className="flex-1 text-xs font-semibold leading-relaxed">
                {toast.text}
              </div>
              <button 
                onClick={() => removeToast(toast.id)}
                className="text-current/60 hover:text-current p-0.5 rounded-lg transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Header Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Resume Hub
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1.5 text-sm leading-relaxed">
            Manage your profile resumes. Upload a new copy to unlock automatic AI analyses and interview simulation modules.
          </p>
        </div>

        {resume && !showUploadForm && (
          <Button
            onClick={() => setShowUploadForm(true)}
            size="sm"
            className="flex items-center gap-1.5 self-start sm:self-center"
          >
            <Plus className="h-4 w-4" />
            Upload New
          </Button>
        )}
      </div>

      {/* Main Content Area */}
      <div className="space-y-6">
        
        {/* Loading placeholder state */}
        {isFetchingResume && (
          <div className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 animate-pulse flex items-center justify-center h-48">
            <span className="text-sm font-semibold text-zinc-400">Loading resume details...</span>
          </div>
        )}

        {/* Error Fetching Resume */}
        {!isFetchingResume && fetchError && (
          <div className="p-4 rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 text-xs flex items-center gap-2.5">
            <AlertCircle className="h-4.5 w-4.5" />
            <span>Failed to read resume information. Please verify your connection.</span>
          </div>
        )}

        {/* 1. Uploading Progress */}
        {isUploading && (
          <UploadProgress fileName={uploadingFileName} progress={uploadProgress} />
        )}

        {/* 2. Upload Zone or Active Resume Card */}
        {!isFetchingResume && !fetchError && (
          <>
            {/* If no resume is active, or user specifically clicks to upload a new one */}
            {(!resume || showUploadForm) && !isUploading ? (
              <div className="space-y-4">
                {showUploadForm && resume && (
                  <div className="flex justify-between items-center px-1">
                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                      Uploading replacement
                    </span>
                    <button 
                      onClick={() => setShowUploadForm(false)}
                      className="text-xs text-brand-600 dark:text-brand-400 hover:underline font-semibold"
                    >
                      Cancel and keep active
                    </button>
                  </div>
                )}
                <UploadZone onFileSelected={handleFileSelect} isLoading={isUploading} />
              </div>
            ) : null}

            {/* Render Active Resume Card */}
            {resume && !showUploadForm && (
              <ResumeCard 
                resume={resume} 
                onResumeDownload={handleDownload}
                onResumeDelete={handleDelete}
                onResumeReplace={handleReplace}
                isDownloading={isDownloading}
                isDeleting={deleteMutation.isPending}
                isReplacing={isUploading}
              />
            )}

            {/* Render Empty Upload State if completely empty */}
            {!resume && !showUploadForm && !isUploading && (
              <EmptyUploadState onClick={() => setShowUploadForm(true)} />
            )}
          </>
        )}

        {/* 3. Action Cards (Downstream Modules) enabled once a resume exists */}
        <AnimatePresence>
          {resume && !showUploadForm && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4 pt-6"
            >
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                Explore AI Modules
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link to="/resumes/analysis">
                  <div className="p-5 border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 hover:bg-zinc-50 dark:hover:bg-zinc-850/30 rounded-2xl flex items-start gap-4 transition-all duration-300 group hover:scale-[1.01]">
                    <div className="p-2.5 bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 rounded-xl group-hover:scale-105 transition-transform duration-300">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-50 tracking-tight group-hover:text-brand-650 dark:group-hover:text-brand-450 transition-colors">
                        Detailed Analysis
                      </h4>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-normal">
                        Deep dive into grammar, layout design, and semantic weaknesses.
                      </p>
                    </div>
                  </div>
                </Link>

                <Link to="/resumes/analysis">
                  <div className="p-5 border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 hover:bg-zinc-50 dark:hover:bg-zinc-850/30 rounded-2xl flex items-start gap-4 transition-all duration-300 group hover:scale-[1.01]">
                    <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-xl group-hover:scale-105 transition-transform duration-300">
                      <BarChart3 className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-50 tracking-tight group-hover:text-indigo-650 dark:group-hover:text-indigo-400 transition-colors">
                        ATS Score Breakdown
                      </h4>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-normal">
                        Score keyword matching density, format warnings, and impact metrics.
                      </p>
                    </div>
                  </div>
                </Link>

                <Link to="/resumes/jd-match">
                  <div className="p-5 border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 hover:bg-zinc-50 dark:hover:bg-zinc-850/30 rounded-2xl flex items-start gap-4 transition-all duration-300 group hover:scale-[1.01]">
                    <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-xl group-hover:scale-105 transition-transform duration-300">
                      <Workflow className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-50 tracking-tight group-hover:text-emerald-650 dark:group-hover:text-emerald-450 transition-colors">
                        Job Match Scan
                      </h4>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-normal">
                        Calculate matching percentage against specific target descriptions.
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ResumeUpload;
