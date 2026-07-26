import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Copy, Download, FileText, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { resumeService } from '../services/resume.service';
import { aiService } from '../services/ai.service';

export const CoverLetter: React.FC = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [tone, setTone] = useState<'Professional' | 'Enthusiastic' | 'Executive'>('Professional');
  const [coverLetter, setCoverLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const { data: resume } = useQuery({
    queryKey: ['myResume'],
    queryFn: () => resumeService.getMyResume(),
  });

  const handleGenerate = async () => {
    if (!jobTitle.trim() || !company.trim()) return;
    setIsGenerating(true);
    setError('');
    setCoverLetter('');
    try {
      const result = await aiService.generateCoverLetter({
        companyName: company.trim(),
        jobRole: jobTitle.trim(),
        tone,
      });
      const text = (result as any)?.coverLetter ?? (result as any)?.reply ?? String(result);
      setCoverLetter(text);
    } catch (err: any) {
      setError(err?.response?.data?.message ?? 'Failed to generate cover letter. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(coverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([coverLetter], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cover_letter_${company.toLowerCase().replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-10">
      <div>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-brand-100 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400">
            <Sparkles className="h-5 w-5" />
          </div>
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            AI Cover Letter Studio
          </h1>
        </div>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm">
          Craft targeted, compelling cover letters tailored to your target position in seconds.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side Parameters */}
        <div className="lg:col-span-1">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Target Role & Tone</CardTitle>
              <CardDescription>Specify the position and tone style.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {resume ? (
                <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 dark:border-emerald-900/40 dark:bg-emerald-950/20 p-3 text-xs text-emerald-700 dark:text-emerald-400">
                  <FileText className="h-4 w-4 shrink-0" />
                  Active resume context detected
                </div>
              ) : (
                <div className="rounded-xl border border-amber-200 bg-amber-50 dark:border-amber-900/40 dark:bg-amber-950/20 p-3 text-xs text-amber-700 dark:text-amber-400">
                  No resume uploaded. Standard candidate context will be applied.
                </div>
              )}

              <Input
                label="Target Job Title"
                placeholder="e.g. Senior Full Stack Engineer"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />

              <Input
                label="Company Name"
                placeholder="e.g. Google / Microsoft"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-1.5">
                  Tone Style
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Professional', 'Enthusiastic', 'Executive'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTone(t)}
                      className={`py-2 px-1 text-xs font-semibold rounded-lg border transition-all ${
                        tone === t
                          ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                          : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="primary"
                disabled={!jobTitle.trim() || !company.trim() || isGenerating}
                isLoading={isGenerating}
                onClick={handleGenerate}
                className="w-full py-3"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                {isGenerating ? 'Generating…' : 'Generate Cover Letter'}
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Right Side Canvas */}
        <div className="lg:col-span-2">
          <Card className="h-full flex flex-col shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
              <div>
                <CardTitle className="text-base">Generated Letter</CardTitle>
                <CardDescription>Review and copy your customized document.</CardDescription>
              </div>
              {coverLetter && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopy}>
                    {copied ? <CheckCircle2 className="h-3.5 w-3.5 mr-1 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDownload}>
                    <Download className="h-3.5 w-3.5 mr-1" />
                    Download .txt
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="flex-1 p-6">
              {isGenerating && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-brand-50 dark:bg-brand-950/30 text-brand-700 dark:text-brand-300 text-xs font-semibold animate-pulse">
                  <Loader2 className="h-4 w-4 animate-spin shrink-0" />
                  Gemini AI is crafting your tailored cover letter...
                </div>
              )}
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 dark:border-red-900/40 dark:bg-red-950/20 p-4 text-xs text-red-700 dark:text-red-400">
                  {error}
                </div>
              )}
              {!isGenerating && !error && !coverLetter && (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <div className="h-14 w-14 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 mb-3">
                    <FileText className="h-6 w-6 text-zinc-400" />
                  </div>
                  <h4 className="font-bold text-zinc-900 dark:text-zinc-50 text-sm">No cover letter generated yet</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-xs leading-relaxed">
                    Fill in the target role and company name, then click Generate.
                  </p>
                </div>
              )}
              {coverLetter && !isGenerating && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="h-full">
                  <div className="whitespace-pre-wrap text-sm font-sans font-medium text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-900 leading-relaxed rounded-2xl p-6 border border-zinc-300 dark:border-zinc-750 h-full overflow-y-auto shadow-inner">
                    {coverLetter}
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CoverLetter;
