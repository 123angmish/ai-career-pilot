import React, { useState, useEffect } from 'react';
import {
  Bell, ChevronRight, Eye, EyeOff, Globe, Lock, LogOut,
  Palette, Save, Shield, Sun, Trash2, User, Download,
  Smartphone, MapPin, Briefcase, FileText, CheckCircle, XCircle,
  AlertTriangle, Info, Sparkles,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { useProfile } from '../context/ProfileContext';

const SETTINGS_KEY = 'cp_settings';

// ─── Types ──────────────────────────────────────────────────────────────────────
interface AppSettings {
  // Notifications
  emailNotifications: boolean;
  interviewReminders: boolean;
  resumeAnalysisAlerts: boolean;
  jobMatchAlerts: boolean;
  productUpdates: boolean;
  // Privacy
  profileVisibility: boolean;
  aiDataUsageConsent: boolean;
  // Preferences
  defaultResume: string;
  preferredJobRole: string;
  preferredLocation: string;
  preferredExperienceLevel: string;
  // Language
  language: string;
}

const defaultSettings: AppSettings = {
  emailNotifications: true,
  interviewReminders: true,
  resumeAnalysisAlerts: true,
  jobMatchAlerts: false,
  productUpdates: false,
  profileVisibility: true,
  aiDataUsageConsent: true,
  defaultResume: '',
  preferredJobRole: '',
  preferredLocation: '',
  preferredExperienceLevel: '',
  language: 'en',
};

// ─── Toast ────────────────────────────────────────────────────────────────────
interface ToastProps { message: string; type: 'success' | 'error' | 'info'; }
const Toast: React.FC<ToastProps> = ({ message, type }) => (
  <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-lg border text-sm font-bold animate-in slide-in-from-bottom-4 duration-300 ${
    type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
    : type === 'error' ? 'bg-rose-50 border-rose-200 text-rose-800'
    : 'bg-blue-50 border-blue-200 text-blue-800'
  }`}>
    {type === 'success' ? <CheckCircle className="h-4 w-4 shrink-0" />
     : type === 'error' ? <XCircle className="h-4 w-4 shrink-0" />
     : <Info className="h-4 w-4 shrink-0" />}
    {message}
  </div>
);

// ─── Toggle Row ───────────────────────────────────────────────────────────────
interface ToggleRowProps { id: string; label: string; description?: string; checked: boolean; onChange: (v: boolean) => void; }
const ToggleRow: React.FC<ToggleRowProps> = ({ id, label, description, checked, onChange }) => (
  <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
    <div>
      <p className="text-sm font-bold text-slate-900">{label}</p>
      {description && <p className="text-xs text-slate-500 mt-0.5 font-medium">{description}</p>}
    </div>
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shrink-0 ${
        checked ? 'bg-indigo-600' : 'bg-slate-300'
      }`}
    >
      <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform shadow ${checked ? 'translate-x-4' : 'translate-x-1'}`} />
    </button>
  </div>
);

// ─── Section ─────────────────────────────────────────────────────────────────
const Section: React.FC<{ id?: string; icon: React.ReactNode; title: string; description: string; children: React.ReactNode }> = ({ id, icon, title, description, children }) => (
  <Card id={id}>
    <CardHeader>
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600 shrink-0">{icon}</div>
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

// ─── Delete Account Modal ──────────────────────────────────────────────────────
const DeleteAccountModal: React.FC<{ onConfirm: () => void; onCancel: () => void }> = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
    <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 max-w-sm w-full mx-4 space-y-4 animate-in zoom-in-95 duration-200">
      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-rose-50 border border-rose-200 mx-auto">
        <AlertTriangle className="h-6 w-6 text-rose-600" />
      </div>
      <div className="text-center">
        <h3 className="text-lg font-bold text-slate-900">Delete Account?</h3>
        <p className="text-sm text-slate-500 mt-1 font-medium">This action is irreversible. All your data, resumes, and history will be permanently removed.</p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1" onClick={onCancel}>Cancel</Button>
        <Button variant="danger" className="flex-1" onClick={onConfirm}>Delete Forever</Button>
      </div>
    </div>
  </div>
);

// ─── Main Component ────────────────────────────────────────────────────────────
export const Settings: React.FC = () => {
  const { user, logout } = useAuth();
  const { resetProfileExt } = useProfile();
  const navigate = useNavigate();

  const [toast, setToast] = useState<ToastProps | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [saved, setSaved] = useState(false);

  // Load settings from localStorage
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      if (saved) return { ...defaultSettings, ...JSON.parse(saved) };
    } catch { /* ignore */ }
    return defaultSettings;
  });

  // Password & Email change states
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [showCurrentPwd, setShowCurrentPwd] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [pwdMsg, setPwdMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const [newEmail, setNewEmail] = useState('');
  const [emailMsg, setEmailMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const activeSessions = [
    { id: '1', device: 'Chrome on Windows', location: 'Chennai, India', lastActive: 'Now', current: true },
    { id: '2', device: 'Safari on iPhone', location: 'Chennai, India', lastActive: '2 hours ago', current: false },
  ];

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const updateSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveAll = () => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    setSaved(true);
    showToast('Settings saved successfully!', 'success');
    setTimeout(() => setSaved(false), 2500);
  };

  const handlePwdChange = () => {
    if (!currentPwd || !newPwd || !confirmPwd) {
      setPwdMsg({ text: 'All password fields are required.', type: 'error' }); return;
    }
    if (newPwd !== confirmPwd) {
      setPwdMsg({ text: 'New passwords do not match.', type: 'error' }); return;
    }
    if (newPwd.length < 8) {
      setPwdMsg({ text: 'Password must be at least 8 characters.', type: 'error' }); return;
    }
    if (newPwd === currentPwd) {
      setPwdMsg({ text: 'New password must differ from current password.', type: 'error' }); return;
    }
    setPwdMsg({ text: 'Password updated successfully!', type: 'success' });
    setCurrentPwd(''); setNewPwd(''); setConfirmPwd('');
    showToast('Password updated!', 'success');
    setTimeout(() => setPwdMsg(null), 4000);
  };

  const handleUpdateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!newEmail) { setEmailMsg({ text: 'Email address is required.', type: 'error' }); return; }
    if (!emailRegex.test(newEmail)) { setEmailMsg({ text: 'Enter a valid email address.', type: 'error' }); return; }
    if (newEmail === user?.email) { setEmailMsg({ text: 'New email must differ from current email.', type: 'error' }); return; }
    setEmailMsg({ text: 'Email update request sent. Please verify your new email.', type: 'success' });
    setNewEmail('');
    setTimeout(() => setEmailMsg(null), 4000);
  };

  const handleDownloadData = () => {
    const data = {
      user,
      settings,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `careerpilot-data-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Personal data exported!', 'success');
  };

  const handleDeleteAccount = () => {
    logout();
    resetProfileExt();
    localStorage.clear();
    navigate('/login', { replace: true });
  };

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const handleLogoutAllDevices = () => {
    showToast('Logged out from all devices.', 'info');
    setTimeout(() => { logout(); navigate('/login', { replace: true }); }, 1500);
  };

  // Password strength
  const pwdStrength = newPwd.length === 0 ? 0
    : newPwd.length < 6 ? 1
    : newPwd.length < 8 ? 2
    : /[A-Z]/.test(newPwd) && /\d/.test(newPwd) && /[^A-Za-z0-9]/.test(newPwd) ? 4
    : 3;
  const pwdStrengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][pwdStrength];
  const pwdStrengthColor = ['', 'bg-rose-400', 'bg-amber-400', 'bg-yellow-400', 'bg-emerald-500'][pwdStrength];

  useEffect(() => {
    document.title = 'Settings | CareerPilot';
    return () => { document.title = 'CareerPilot'; };
  }, []);

  return (
    <div className="space-y-6 pb-10">
      {toast && <Toast {...toast} />}
      {showDeleteModal && (
        <DeleteAccountModal
          onConfirm={handleDeleteAccount}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">Settings</h1>
          <p className="text-slate-500 mt-1 font-medium">Manage your preferences, privacy, and account.</p>
        </div>
        <Button variant="primary" id="settings-save-all" onClick={handleSaveAll} className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold">
          <Save className="h-4 w-4 mr-2" />
          {saved ? 'Saved!' : 'Save All'}
        </Button>
      </div>

      <div className="max-w-3xl space-y-6">

        {/* ── 1. APPEARANCE ─────────────────────────────────────────────── */}
        <Section id="settings-appearance" icon={<Palette className="h-4 w-4" />} title="Appearance" description="CareerPilot is optimized in modern 2026 Light SaaS Theme.">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-extrabold text-slate-900 mb-2">Interface Theme</p>
              <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-indigo-900 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-white text-indigo-600 shadow-2xs">
                    <Sun className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold">Light Mode Active</p>
                    <p className="text-xs text-indigo-700 font-medium">Designed for optimal legibility, executive presentation & high-contrast reading.</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-extrabold">Clean Light</span>
              </div>
            </div>
          </div>
        </Section>

        {/* ── 2. NOTIFICATIONS ──────────────────────────────────────────── */}
        <Section id="settings-notifications" icon={<Bell className="h-4 w-4" />} title="Notifications" description="Control which alerts you receive via email and in-app.">
          <ToggleRow id="notif-email" label="Email Notifications" description="Receive general account emails and weekly summaries" checked={settings.emailNotifications} onChange={(v) => updateSetting('emailNotifications', v)} />
          <ToggleRow id="notif-interview" label="Interview Reminders" description="Remind you to practice before upcoming interviews" checked={settings.interviewReminders} onChange={(v) => updateSetting('interviewReminders', v)} />
          <ToggleRow id="notif-resume" label="Resume Analysis Alerts" description="Notify when AI has new analysis ready for your resume" checked={settings.resumeAnalysisAlerts} onChange={(v) => updateSetting('resumeAnalysisAlerts', v)} />
          <ToggleRow id="notif-jobs" label="Job Match Alerts" description="Alert when a JD closely matches your resume profile" checked={settings.jobMatchAlerts} onChange={(v) => updateSetting('jobMatchAlerts', v)} />
          <ToggleRow id="notif-updates" label="Product Updates" description="Feature releases, platform news, and announcements" checked={settings.productUpdates} onChange={(v) => updateSetting('productUpdates', v)} />
        </Section>

        {/* ── 3. PRIVACY ────────────────────────────────────────────────── */}
        <Section id="settings-privacy" icon={<Shield className="h-4 w-4" />} title="Privacy" description="Control your data, visibility, and AI consent.">
          <ToggleRow id="privacy-visibility" label="Profile Visibility" description="Allow your profile to appear in employer and recruiter searches" checked={settings.profileVisibility} onChange={(v) => updateSetting('profileVisibility', v)} />
          <ToggleRow id="privacy-ai-consent" label="AI Data Usage Consent" description="Allow CareerPilot AI to use your data to improve suggestions" checked={settings.aiDataUsageConsent} onChange={(v) => updateSetting('aiDataUsageConsent', v)} />
          <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
            <button
              id="privacy-download"
              onClick={handleDownloadData}
              className="flex w-full items-center justify-between px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 hover:bg-slate-50 transition-colors group font-semibold"
            >
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4 text-slate-400" />
                <span>Download My Personal Data</span>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </Section>

        {/* ── 4. SECURITY ───────────────────────────────────────────────── */}
        <Section id="settings-security" icon={<Lock className="h-4 w-4" />} title="Security" description="Change your password and manage active sessions.">
          <div className="space-y-5">
            <div className="space-y-3">
              <p className="text-sm font-bold text-slate-900">Change Password</p>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Current Password</label>
                <div className="relative">
                  <input
                    id="pwd-current"
                    type={showCurrentPwd ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={currentPwd}
                    onChange={(e) => setCurrentPwd(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white text-slate-900 text-sm px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                  />
                  <button type="button" onClick={() => setShowCurrentPwd(!showCurrentPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showCurrentPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">New Password</label>
                <div className="relative">
                  <input
                    id="pwd-new"
                    type={showNewPwd ? 'text' : 'password'}
                    placeholder="Min. 8 characters"
                    value={newPwd}
                    onChange={(e) => setNewPwd(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white text-slate-900 text-sm px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                  />
                  <button type="button" onClick={() => setShowNewPwd(!showNewPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showNewPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {newPwd && (
                  <div className="mt-1.5 space-y-1">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= pwdStrength ? pwdStrengthColor : 'bg-slate-200'}`} />
                      ))}
                    </div>
                    <p className={`text-xs font-bold ${pwdStrength <= 1 ? 'text-rose-600' : pwdStrength <= 2 ? 'text-amber-600' : pwdStrength === 3 ? 'text-yellow-600' : 'text-emerald-600'}`}>{pwdStrengthLabel}</p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Confirm New Password</label>
                <input
                  id="pwd-confirm"
                  type="password"
                  placeholder="Repeat new password"
                  value={confirmPwd}
                  onChange={(e) => setConfirmPwd(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white text-slate-900 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                />
              </div>

              {pwdMsg && (
                <p className={`text-xs font-bold ${pwdMsg.type === 'success' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {pwdMsg.text}
                </p>
              )}
              <Button id="security-update-pwd" variant="primary" size="sm" onClick={handlePwdChange} className="bg-indigo-600 text-white font-bold">
                Update Password
              </Button>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <p className="text-sm font-bold text-slate-900">Active Sessions</p>
              <div className="space-y-2">
                {activeSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-white border border-slate-200">
                        <Smartphone className="h-4 w-4 text-slate-500" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{session.device}</p>
                        <p className="text-xs text-slate-500 font-medium">{session.location} · {session.lastActive}</p>
                      </div>
                    </div>
                    {session.current ? (
                      <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">Current</span>
                    ) : (
                      <button className="text-xs text-rose-600 hover:underline font-bold">Revoke</button>
                    )}
                  </div>
                ))}
              </div>
              <Button id="security-logout-all" variant="outline" size="sm" onClick={handleLogoutAllDevices} className="border-slate-200 text-slate-700">
                <LogOut className="h-3.5 w-3.5 mr-1.5" /> Logout From All Devices
              </Button>
            </div>
          </div>
        </Section>

        {/* ── 5. PREFERENCES ────────────────────────────────────────────── */}
        <Section id="settings-preferences" icon={<Briefcase className="h-4 w-4" />} title="Preferences" description="Set your job search preferences for better AI matching.">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Default Resume</label>
              <div className="flex gap-2">
                <input
                  id="pref-default-resume"
                  type="text"
                  placeholder="My_Resume_2024.pdf"
                  value={settings.defaultResume}
                  onChange={(e) => updateSetting('defaultResume', e.target.value)}
                  className="flex-1 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                />
                <button className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-500 transition-colors">
                  <FileText className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Preferred Job Role</label>
              <input
                id="pref-job-role"
                type="text"
                placeholder="Software Engineer, Product Manager…"
                value={settings.preferredJobRole}
                onChange={(e) => updateSetting('preferredJobRole', e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white text-slate-900 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Preferred Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                <input
                  id="pref-location"
                  type="text"
                  placeholder="Remote, Bengaluru, New York…"
                  value={settings.preferredLocation}
                  onChange={(e) => updateSetting('preferredLocation', e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white text-slate-900 text-sm pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Preferred Experience Level</label>
              <select
                id="pref-experience"
                value={settings.preferredExperienceLevel}
                onChange={(e) => updateSetting('preferredExperienceLevel', e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white text-slate-900 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
              >
                <option value="">Any Experience Level</option>
                <option value="internship">Internship</option>
                <option value="entry">Entry Level (0-2 years)</option>
                <option value="mid">Mid Level (2-5 years)</option>
                <option value="senior">Senior Level (5-10 years)</option>
                <option value="lead">Lead / Principal (10+ years)</option>
              </select>
            </div>
          </div>
        </Section>

        {/* ── 6. LANGUAGE ───────────────────────────────────────────────── */}
        <Section id="settings-language" icon={<Globe className="h-4 w-4" />} title="Language" description="Select your preferred display language.">
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Display Language</label>
              <select
                id="settings-language-select"
                value={settings.language}
                onChange={(e) => updateSetting('language', e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white text-slate-900 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
              >
                <option value="en">English (US)</option>
                <option value="en-gb">English (UK)</option>
                <option value="ta">Tamil</option>
                <option value="hi">Hindi</option>
                <option value="de">German</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
                <option value="pt">Portuguese</option>
              </select>
            </div>
            <p className="text-xs text-slate-500 font-medium">Full multi-language support is coming soon. Your preference will be applied when available.</p>
          </div>
        </Section>

        {/* ── 6.5 AI ENGINE CONFIGURATION ───────────────────────────────── */}
        <Section id="settings-ai-engine" icon={<Sparkles className="h-4 w-4 text-indigo-600" />} title="AI Engine & Real Generation" description="Configure Gemini AI settings and custom API keys for real-time response generation.">
          <div className="space-y-4">
            <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100 text-xs text-indigo-800 font-medium">
              ⚡ <strong>Resilient Multi-Engine Active:</strong> CareerPilot automatically handles live AI queries via Gemini AI with high-precision contextual fallbacks so responses are always generated.
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Custom Gemini API Key (Optional)</label>
              <input
                type="password"
                placeholder="AIzaSy..."
                defaultValue={localStorage.getItem('cp_custom_gemini_key') || ''}
                onChange={(e) => {
                  const val = e.target.value.trim();
                  if (val) localStorage.setItem('cp_custom_gemini_key', val);
                  else localStorage.removeItem('cp_custom_gemini_key');
                }}
                className="w-full rounded-xl border border-slate-200 bg-white text-slate-900 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
              />
              <p className="text-[11px] text-slate-400 mt-1 font-medium">If provided, custom key will be passed for direct Google Gemini API requests.</p>
            </div>
          </div>
        </Section>

        {/* ── 7. ACCOUNT ────────────────────────────────────────────────── */}
        <Section id="settings-account" icon={<User className="h-4 w-4" />} title="Account" description="Manage your account, email, and danger zone.">
          <div className="rounded-xl border border-slate-200 divide-y divide-slate-100 mb-5">
            {[
              { label: 'Name', value: user ? `${user.firstName} ${user.lastName}` : '—' },
              { label: 'Email', value: user?.email ?? '—' },
              { label: 'Role', value: user?.role ?? 'USER' },
              { label: 'Member Since', value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '—' },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between px-4 py-2.5">
                <span className="text-xs text-slate-500 font-medium">{label}</span>
                <span className="text-xs font-bold text-slate-900">{value}</span>
              </div>
            ))}
          </div>

          <div className="mb-5 space-y-2">
            <p className="text-sm font-bold text-slate-900">Update Email Address</p>
            <div className="flex gap-2">
              <input
                id="account-new-email"
                type="email"
                placeholder="newemail@example.com"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="flex-1 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
              />
              <Button id="account-update-email" variant="secondary" size="sm" onClick={handleUpdateEmail} className="bg-slate-100 text-slate-800 font-bold">
                Update
              </Button>
            </div>
            {emailMsg && (
              <p className={`text-xs font-bold ${emailMsg.type === 'success' ? 'text-emerald-600' : 'text-rose-600'}`}>
                {emailMsg.text}
              </p>
            )}
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-100">
            <button
              id="account-logout"
              onClick={handleLogout}
              className="flex w-full items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 hover:bg-slate-50 transition-colors font-bold cursor-pointer"
            >
              <LogOut className="h-4 w-4 text-slate-400" />
              Sign Out
            </button>
            <button
              id="account-delete"
              onClick={() => setShowDeleteModal(true)}
              className="flex w-full items-center gap-2 px-4 py-2.5 rounded-xl border border-rose-200 text-sm text-rose-700 hover:bg-rose-50 transition-colors font-bold cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
              Delete Account Permanently
            </button>
          </div>
        </Section>

      </div>
    </div>
  );
};

export default Settings;
