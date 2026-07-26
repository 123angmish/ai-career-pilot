import React, { useMemo } from 'react';
import { FileText, Calendar, HardDrive } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ResumeDto } from '../../types/resume';
import { ResumeActions } from './ResumeActions';
import { UploadStatus } from './UploadStatus';

interface ResumeCardProps {
  resume: ResumeDto;
  onResumeDownload: () => void;
  onResumeDelete: () => void;
  onResumeReplace: (file: File) => void;
  isDownloading: boolean;
  isDeleting: boolean;
  isReplacing: boolean;
}

export const ResumeCard: React.FC<ResumeCardProps> = ({
  resume,
  onResumeDownload,
  onResumeDelete,
  onResumeReplace,
  isDownloading,
  isDeleting,
  isReplacing,
}) => {
  // Format file size cleanly
  const formattedSize = useMemo(() => {
    const sizeInKb = resume.fileSize / 1024;
    if (sizeInKb > 1024) {
      return `${(sizeInKb / 1024).toFixed(2)} MB`;
    }
    return `${sizeInKb.toFixed(0)} KB`;
  }, [resume.fileSize]);

  // Format date cleanly
  const formattedDate = useMemo(() => {
    if (!resume.uploadedAt) return 'Unknown Date';
    try {
      const date = new Date(resume.uploadedAt);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return resume.uploadedAt;
    }
  }, [resume.uploadedAt]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.4 }}
      className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md shadow-md space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* File information */}
        <div className="flex items-start gap-4">
          <div className="p-3 bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 rounded-2xl shadow-sm">
            <FileText className="h-7 w-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-55 truncate max-w-sm sm:max-w-md md:max-w-lg tracking-tight select-all">
              {resume.fileName}
            </h3>
            
            <div className="flex flex-wrap items-center gap-3.5 text-xs text-zinc-500 dark:text-zinc-450">
              <div className="flex items-center gap-1.5">
                <HardDrive className="h-3.5 w-3.5 text-zinc-400" />
                <span>{formattedSize}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                <span>Uploaded {formattedDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions panel */}
        <div className="shrink-0 sm:self-center">
          <ResumeActions
            onResumeDownload={onResumeDownload}
            onResumeDelete={onResumeDelete}
            onResumeReplace={onResumeReplace}
            isDownloading={isDownloading}
            isDeleting={isDeleting}
            isReplacing={isReplacing}
          />
        </div>
      </div>

      <hr className="border-zinc-200/60 dark:border-zinc-800/60" />

      {/* Progress status card step indicator */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-300 uppercase tracking-wider">
          Resume Health Status
        </h4>
        <UploadStatus status="ats_ready" />
      </div>
    </motion.div>
  );
};

export default ResumeCard;
