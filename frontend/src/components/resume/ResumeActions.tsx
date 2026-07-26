import React, { useRef } from 'react';
import { Download, RefreshCw, Trash2, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';

interface ResumeActionsProps {
  onResumeDownload: () => void;
  onResumeDelete: () => void;
  onResumeReplace: (file: File) => void;
  isDownloading: boolean;
  isDeleting: boolean;
  isReplacing: boolean;
}

export const ResumeActions: React.FC<ResumeActionsProps> = ({
  onResumeDownload,
  onResumeDelete,
  onResumeReplace,
  isDownloading,
  isDeleting,
  isReplacing,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        onResumeReplace(file);
      }
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="application/pdf"
        className="hidden"
      />

      <Button
        variant="outline"
        size="sm"
        onClick={onResumeDownload}
        disabled={isDownloading || isDeleting || isReplacing}
        className="flex items-center gap-2"
      >
        {isDownloading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Download className="h-4 w-4" />
        )}
        Download PDF
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => fileInputRef.current?.click()}
        disabled={isDownloading || isDeleting || isReplacing}
        className="flex items-center gap-2"
      >
        {isReplacing ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCw className="h-4 w-4" />
        )}
        Replace File
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={onResumeDelete}
        disabled={isDownloading || isDeleting || isReplacing}
        className="flex items-center gap-2 text-red-650 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 border-red-200 dark:border-red-900/40"
      >
        {isDeleting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
        Delete Resume
      </Button>
    </div>
  );
};

export default ResumeActions;
