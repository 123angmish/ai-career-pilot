import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FileType2, AlertCircle } from 'lucide-react';

interface UploadZoneProps {
  onFileSelected: (file: File) => void;
  isLoading: boolean;
}

export const UploadZone: React.FC<UploadZoneProps> = ({ onFileSelected, isLoading }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const validateAndProcessFile = (file: File) => {
    setValidationError(null);
    const fileName = file.name.toLowerCase();
    const mime = file.type.toLowerCase();

    // Valid formats: PDF, TXT, MD, PNG, JPG, JPEG, WEBP, DOC, DOCX
    const isValidType =
      mime === 'application/pdf' ||
      mime.startsWith('image/') ||
      mime.includes('text') ||
      fileName.endsWith('.pdf') ||
      fileName.endsWith('.txt') ||
      fileName.endsWith('.md') ||
      fileName.endsWith('.png') ||
      fileName.endsWith('.jpg') ||
      fileName.endsWith('.jpeg') ||
      fileName.endsWith('.webp') ||
      fileName.endsWith('.doc') ||
      fileName.endsWith('.docx');

    if (!isValidType) {
      setValidationError('Please upload a PDF, TXT, DOCX, or Photo/Image file.');
      return;
    }

    // Validate size (15 MB limit)
    const MAX_SIZE = 15 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setValidationError('File size exceeds 15 MB limit. Please select a smaller file.');
      return;
    }

    if (file.size === 0) {
      setValidationError('Selected file is empty.');
      return;
    }

    onFileSelected(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (isLoading) return;

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isLoading) return;
    if (e.target.files && e.target.files[0]) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-3">
      <motion.div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isLoading && fileInputRef.current?.click()}
        whileHover={!isLoading ? { scale: 1.005 } : undefined}
        whileTap={!isLoading ? { scale: 0.995 } : undefined}
        className={`
          border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center 
          cursor-pointer transition-all duration-300 relative overflow-hidden select-none
          ${
            isDragging
              ? 'border-brand-500 bg-brand-50/40 dark:bg-brand-950/20'
              : 'border-zinc-350 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 hover:border-zinc-400 dark:hover:border-zinc-700 hover:bg-zinc-50/50 dark:hover:bg-zinc-950/10'
          }
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,.txt,.md,.png,.jpg,.jpeg,.webp,.doc,.docx,image/*"
          disabled={isLoading}
          className="hidden"
        />

        <AnimatePresence>
          {isDragging && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-brand-500/5 dark:bg-brand-500/10 pointer-events-none"
            />
          )}
        </AnimatePresence>

        <div className="p-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-550 dark:text-zinc-400 rounded-xl mb-4 shadow-sm group-hover:scale-105 transition-transform duration-300">
          <UploadCloud className="h-6 w-6 text-brand-600 dark:text-brand-400" />
        </div>

        <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 text-center">
          Drag and drop your file here, or <span className="text-brand-600 dark:text-brand-400 hover:underline">browse files</span>
        </p>

        <div className="flex items-center gap-1.5 mt-2 text-xs text-zinc-500 dark:text-zinc-450 text-center font-medium">
          <FileType2 className="h-3.5 w-3.5" />
          <span>Supported: PDF, TXT, Photo / Image (PNG, JPG), DOCX</span>
        </div>
      </motion.div>

      <AnimatePresence>
        {validationError && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-start gap-2.5 rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-950/30 p-3.5 text-xs text-red-700 dark:text-red-400 font-medium"
          >
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{validationError}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UploadZone;
