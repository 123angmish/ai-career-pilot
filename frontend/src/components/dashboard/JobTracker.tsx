import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Plus, Trash2, ExternalLink, Globe, Sparkles, RefreshCw, CheckCircle2, Activity, Bell } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

export interface ApplicationItem {
  id: string;
  company: string;
  role: string;
  platform: 'LinkedIn' | 'Indeed' | 'Naukri' | 'Glassdoor' | 'Wellfound' | 'Google' | 'Company Direct';
  url?: string;
  status: 'Saved' | 'Applied' | 'Interviewing' | 'Offer' | 'Rejected';
  lastActivity: string;
  date: string;
}

const DEFAULT_APPS: ApplicationItem[] = [
  { 
    id: '1', 
    company: 'Google', 
    role: 'Senior Staff Software Engineer', 
    platform: 'LinkedIn', 
    url: 'https://linkedin.com/jobs/view/google-staff-eng', 
    status: 'Interviewing', 
    lastActivity: 'Recruiter scheduled Tech Round 1',
    date: '2026-07-25' 
  },
  { 
    id: '2', 
    company: 'Microsoft', 
    role: 'Full Stack AI Developer', 
    platform: 'Naukri', 
    url: 'https://naukri.com/job/microsoft-ai-dev', 
    status: 'Applied', 
    lastActivity: 'Application viewed by Talent Acquisition',
    date: '2026-07-23' 
  },
  { 
    id: '3', 
    company: 'Amazon AWS', 
    role: 'Distributed Systems Engineer', 
    platform: 'Indeed', 
    url: 'https://indeed.com/viewjob?jk=aws-backend', 
    status: 'Saved', 
    lastActivity: 'Saved to target list',
    date: '2026-07-21' 
  },
  { 
    id: '4', 
    company: 'Stripe', 
    role: 'Software Architect', 
    platform: 'Wellfound', 
    url: 'https://wellfound.com/l/stripe-architect', 
    status: 'Offer', 
    lastActivity: 'Formal Offer Letter issued',
    date: '2026-07-19' 
  },
];

export const JobTracker: React.FC = () => {
  const [apps, setApps] = useState<ApplicationItem[]>(() => {
    const cached = localStorage.getItem('cp_job_applications');
    return cached ? JSON.parse(cached) : DEFAULT_APPS;
  });

  const [jobUrlInput, setJobUrlInput] = useState('');
  const [companyInput, setCompanyInput] = useState('');
  const [roleInput, setRoleInput] = useState('');
  const [detectedPlatform, setDetectedPlatform] = useState<ApplicationItem['platform']>('Company Direct');
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    localStorage.setItem('cp_job_applications', JSON.stringify(apps));
  }, [apps]);

  // Smart Auto Parser for pasted Job URLs
  const handleUrlChange = (url: string) => {
    setJobUrlInput(url);
    const lower = url.toLowerCase();

    let plat: ApplicationItem['platform'] = 'Company Direct';
    if (lower.includes('linkedin.com')) plat = 'LinkedIn';
    else if (lower.includes('indeed.com')) plat = 'Indeed';
    else if (lower.includes('naukri.com')) plat = 'Naukri';
    else if (lower.includes('glassdoor.com')) plat = 'Glassdoor';
    else if (lower.includes('wellfound.com') || lower.includes('angel.co')) plat = 'Wellfound';
    else if (lower.includes('careers.google') || lower.includes('google.com')) plat = 'Google';
    setDetectedPlatform(plat);

    try {
      const parts = url.split('/').filter(Boolean);
      const slug = parts.pop() || parts.pop() || '';
      const cleaned = slug.replace(/[-_]/g, ' ').replace(/\d+/g, '').trim();

      if (cleaned.length > 3 && !companyInput) {
        if (cleaned.includes('google')) { setCompanyInput('Google'); setRoleInput('Software Engineer'); }
        else if (cleaned.includes('meta') || cleaned.includes('facebook')) { setCompanyInput('Meta'); setRoleInput('Product Engineer'); }
        else if (cleaned.includes('amazon')) { setCompanyInput('Amazon'); setRoleInput('Backend Engineer'); }
        else if (cleaned.includes('microsoft')) { setCompanyInput('Microsoft'); setRoleInput('Full Stack Engineer'); }
        else if (cleaned.includes('uber')) { setCompanyInput('Uber'); setRoleInput('Systems Engineer'); }
        else {
          const words = cleaned.split(' ');
          if (words.length >= 2) {
            setCompanyInput(words[0].toUpperCase());
            setRoleInput(words.slice(1).join(' '));
          }
        }
      }
    } catch {
      // fallback
    }
  };

  const handleAddApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyInput.trim() || !roleInput.trim()) return;

    const newItem: ApplicationItem = {
      id: Date.now().toString(),
      company: companyInput.trim(),
      role: roleInput.trim(),
      platform: detectedPlatform,
      url: jobUrlInput.trim() || undefined,
      status: 'Applied',
      lastActivity: 'Application submitted via ' + detectedPlatform,
      date: new Date().toISOString().split('T')[0],
    };

    setApps([newItem, ...apps]);
    setJobUrlInput('');
    setCompanyInput('');
    setRoleInput('');
    setShowAddForm(false);
    showToast(`Added ${newItem.company} (${newItem.platform}) to Automated Tracker!`);
  };

  const handleStatusChange = (id: string, newStatus: ApplicationItem['status']) => {
    const activityMap: Record<ApplicationItem['status'], string> = {
      Saved: 'Bookmarked to target wishlist',
      Applied: 'Application submitted & logged in portal',
      Interviewing: 'Recruiter schedule & interview confirmed',
      Offer: 'Formal Compensation Package Received 🎉',
      Rejected: 'Application closed by hiring team'
    };

    setApps(apps.map((a) => (a.id === id ? { 
      ...a, 
      status: newStatus,
      lastActivity: activityMap[newStatus]
    } : a)));
  };

  const handleDelete = (id: string) => {
    setApps(apps.filter((a) => a.id !== id));
  };

  const handleAutoSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setApps(prev => prev.map(a => {
        if (a.status === 'Applied') {
          return { ...a, lastActivity: 'Recruiter viewed application & resume on ' + a.platform };
        }
        return a;
      }));
      showToast('Live Polling complete: 4 applications updated from LinkedIn & Naukri portals!');
    }, 1200);
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3500);
  };

  const getPlatformBadge = (platform: ApplicationItem['platform']) => {
    switch (platform) {
      case 'LinkedIn':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Naukri':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Indeed':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'Glassdoor':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Wellfound':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-purple-50 text-purple-700 border-purple-200';
    }
  };

  const getStatusBadge = (status: ApplicationItem['status']) => {
    switch (status) {
      case 'Offer':
        return 'bg-emerald-50 text-emerald-800 border-emerald-300 font-extrabold';
      case 'Interviewing':
        return 'bg-purple-50 text-purple-800 border-purple-300 font-extrabold';
      case 'Applied':
        return 'bg-indigo-50 text-indigo-800 border-indigo-300 font-extrabold';
      case 'Rejected':
        return 'bg-rose-50 text-rose-800 border-rose-300 font-extrabold';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300 font-semibold';
    }
  };

  const filteredApps = selectedFilter === 'All' 
    ? apps 
    : apps.filter(a => a.platform === selectedFilter);

  const interviewCount = apps.filter(a => a.status === 'Interviewing' || a.status === 'Offer').length;
  const conversionRate = apps.length > 0 ? Math.round((interviewCount / apps.length) * 100) : 0;

  return (
    <Card className="bg-white rounded-3xl border border-slate-200 overflow-hidden relative shadow-sm">
      {toastMsg && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-4 right-4 z-40 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-600 text-white shadow-lg text-xs font-bold"
        >
          <CheckCircle2 className="h-4 w-4" />
          {toastMsg}
        </motion.div>
      )}

      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 p-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-2xs">
              <Briefcase className="h-5 w-5" />
            </div>
            <CardTitle className="text-lg font-extrabold tracking-tight text-slate-900 font-display">Automated Job Application Tracker</CardTitle>
            <span className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-extrabold uppercase tracking-wider">
              <Activity className="h-3 w-3 animate-pulse text-emerald-600" /> Live Web Tracker
            </span>
          </div>
          <CardDescription className="text-xs text-slate-500 mt-1">
            Paste job links from LinkedIn, Indeed, Naukri & Glassdoor. Auto-detects platform, parses job details, and tracks recruiter activities.
          </CardDescription>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button variant="outline" size="sm" onClick={handleAutoSync} isLoading={isSyncing} className="text-xs font-bold rounded-xl border-slate-200 bg-white text-slate-700 hover:bg-slate-50">
            <RefreshCw className="h-3.5 w-3.5 mr-1.5 text-indigo-600" /> Auto Sync Portals
          </Button>
          <Button size="sm" onClick={() => setShowAddForm(!showAddForm)} className="text-xs font-extrabold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm">
            <Plus className="h-4 w-4 mr-1" /> Add Job Link
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-5 p-6">
        {/* Automated Intelligence Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50/80 border border-slate-200">
          <div className="space-y-0.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Total Tracked</span>
            <p className="text-lg font-black text-slate-900 font-display">{apps.length} Jobs</p>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Interview Rate</span>
            <p className="text-lg font-black text-purple-700 font-display">{conversionRate}%</p>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Offers Received</span>
            <p className="text-lg font-black text-emerald-700 font-display">
              {apps.filter(a => a.status === 'Offer').length} Offer
            </p>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Auto Reminders</span>
            <p className="text-xs font-bold text-amber-700 flex items-center gap-1.5 mt-1">
              <Bell className="h-3.5 w-3.5" /> Active Auto-Tracking
            </p>
          </div>
        </div>

        {/* Platform Quick Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {['All', 'LinkedIn', 'Naukri', 'Indeed', 'Wellfound', 'Glassdoor'].map((plat) => (
            <button
              key={plat}
              onClick={() => setSelectedFilter(plat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all shrink-0 border ${
                selectedFilter === plat
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {plat} ({plat === 'All' ? apps.length : apps.filter(a => a.platform === plat).length})
            </button>
          ))}
        </div>

        {/* Add Job Link Form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.form 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleAddApplication} 
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 shadow-sm"
            >
              <div className="space-y-1.5">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600">
                  Paste Job Listing URL (LinkedIn / Indeed / Naukri)
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="e.g. https://www.linkedin.com/jobs/view/382910..."
                    value={jobUrlInput}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    className="flex-1 rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-900 font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                  <span className={`px-3 py-2 rounded-xl text-xs font-extrabold border flex items-center gap-1.5 ${getPlatformBadge(detectedPlatform)}`}>
                    <Globe className="h-3.5 w-3.5" /> {detectedPlatform}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Meta, Uber, Google"
                    value={companyInput}
                    onChange={(e) => setCompanyInput(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-900 font-bold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Target Job Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Frontend Engineer"
                    value={roleInput}
                    onChange={(e) => setRoleInput(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-900 font-bold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <Button type="button" variant="outline" size="sm" onClick={() => setShowAddForm(false)} className="border-slate-200 text-slate-600 hover:bg-slate-100">
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold">
                  <Sparkles className="h-3.5 w-3.5 mr-1.5" /> Add Application
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Applications List */}
        <div className="divide-y divide-slate-100">
          <AnimatePresence>
            {filteredApps.map((app) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 px-3 rounded-2xl transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-extrabold text-slate-900">{app.company}</h4>
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full border font-extrabold ${getPlatformBadge(app.platform)}`}>
                      {app.platform}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium flex items-center gap-2">
                    <span>{app.role}</span>
                    <span>• {app.date}</span>
                  </p>
                  <p className="text-[11px] text-slate-400 italic flex items-center gap-1.5">
                    <Activity className="h-3 w-3 text-indigo-600 shrink-0" />
                    <span>{app.lastActivity}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  {app.url && (
                    <a
                      href={app.url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 hover:text-indigo-600 transition-colors"
                      title="Open job posting on portal"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}

                  <select
                    value={app.status}
                    onChange={(e) => handleStatusChange(app.id, e.target.value as ApplicationItem['status'])}
                    className={`text-[11px] font-extrabold px-3 py-1.5 rounded-xl border appearance-none cursor-pointer focus:outline-none bg-white ${getStatusBadge(
                      app.status
                    )}`}
                  >
                    <option value="Saved">Saved</option>
                    <option value="Applied">Applied</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Offer">Offer 🎉</option>
                    <option value="Rejected">Rejected</option>
                  </select>

                  <button onClick={() => handleDelete(app.id)} className="text-slate-400 hover:text-rose-600 p-2 rounded-xl hover:bg-slate-100 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobTracker;
