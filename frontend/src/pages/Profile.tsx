import React, { useState, useRef, useEffect } from 'react';
import {
  User, Mail, Calendar,
  BookOpen, Briefcase, FileText,
  Shield, Clock, CheckCircle, XCircle, Upload,
  Edit3, Save, X, Camera, Tag, Plus,
  ChevronDown,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProfile } from '../context/ProfileContext';

// ─── Toast notification ─────────────────────────────────────────────────────────
interface ToastProps { message: string; type: 'success' | 'error'; }
const Toast: React.FC<ToastProps> = ({ message, type }) => (
  <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border text-sm font-medium animate-in slide-in-from-bottom-4 duration-300 ${
    type === 'success'
      ? 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
      : 'bg-red-50 dark:bg-red-950/80 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
  }`}>
    {type === 'success' ? <CheckCircle className="h-4 w-4 shrink-0" /> : <XCircle className="h-4 w-4 shrink-0" />}
    {message}
  </div>
);

// ─── Section wrapper ────────────────────────────────────────────────────────────
interface SectionProps { icon: React.ReactNode; title: string; description?: string; children: React.ReactNode; }
const ProfileSection: React.FC<SectionProps> = ({ icon, title, description, children }) => (
  <Card>
    <CardHeader>
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 shrink-0">
          {icon}
        </div>
        <div>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
      </div>
    </CardHeader>
    <CardContent className="pt-2">{children}</CardContent>
  </Card>
);

// ─── Read-only field row ────────────────────────────────────────────────────────
const FieldRow: React.FC<{ label: string; value?: string; icon?: React.ReactNode }> = ({ label, value, icon }) => (
  <div className="flex flex-col gap-0.5 py-2 border-b border-zinc-100 dark:border-zinc-800 last:border-0">
    <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium uppercase tracking-wide">{label}</span>
    <div className="flex items-center gap-2 text-sm text-zinc-800 dark:text-zinc-200">
      {icon && <span className="text-zinc-400">{icon}</span>}
      <span>{value || <span className="text-zinc-400 dark:text-zinc-600 italic">Not set</span>}</span>
    </div>
  </div>
);

// ─── Skills tag input ───────────────────────────────────────────────────────────
interface SkillTagsProps { skills: string[]; onChange: (skills: string[]) => void; editing: boolean; }
const SkillTags: React.FC<SkillTagsProps> = ({ skills, onChange, editing }) => {
  const [input, setInput] = useState('');

  const addSkill = () => {
    const trimmed = input.trim();
    if (trimmed && !skills.includes(trimmed)) {
      onChange([...skills, trimmed]);
    }
    setInput('');
  };

  const removeSkill = (skill: string) => onChange(skills.filter((s) => s !== skill));

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span key={skill} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
            <Tag className="h-3 w-3" />
            {skill}
            {editing && (
              <button onClick={() => removeSkill(skill)} className="ml-0.5 hover:text-red-500 transition-colors">
                <X className="h-3 w-3" />
              </button>
            )}
          </span>
        ))}
        {skills.length === 0 && !editing && (
          <span className="text-sm text-zinc-400 dark:text-zinc-600 italic">No skills added yet</span>
        )}
      </div>
      {editing && (
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }}
            placeholder="Type a skill & press Enter"
            className="flex-1 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
          <button onClick={addSkill} className="p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors">
            <Plus className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

// ─── Main Component ─────────────────────────────────────────────────────────────
export const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { profileExt, updateProfileExt } = useProfile();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [toast, setToast] = useState<ToastProps | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Local draft state while editing
  const [draft, setDraft] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    ...profileExt,
    skills: profileExt.skills || [],
  });

  // Sync draft when profileExt changes externally
  useEffect(() => {
    if (!isEditing) {
      setDraft({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        ...profileExt,
        skills: profileExt.skills || [],
      });
    }
  }, [user, profileExt, isEditing]);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!draft.firstName.trim()) newErrors.firstName = 'First name is required.';
    if (!draft.lastName.trim()) newErrors.lastName = 'Last name is required.';
    if (draft.phone && !/^\+?[0-9\s\-()]{7,20}$/.test(draft.phone)) {
      newErrors.phone = 'Enter a valid phone number.';
    }
    if (draft.cgpa && (isNaN(Number(draft.cgpa)) || Number(draft.cgpa) > 10)) {
      newErrors.cgpa = 'CGPA must be a number ≤ 10.';
    }
    if (draft.graduationYear && !/^\d{4}$/.test(draft.graduationYear)) {
      newErrors.graduationYear = 'Enter a valid 4-digit year.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) {
      showToast('Please fix the errors before saving.', 'error');
      return;
    }
    // Update auth user for core fields
    if (user) {
      updateUser({ ...user, firstName: draft.firstName.trim(), lastName: draft.lastName.trim() });
    }
    // Save extended profile
    const { firstName: _fn, lastName: _ln, ...extFields } = draft;
    updateProfileExt(extFields);
    setIsEditing(false);
    showToast('Profile saved successfully!', 'success');
  };

  const handleCancel = () => {
    setDraft({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      ...profileExt,
      skills: profileExt.skills || [],
    });
    setErrors({});
    setIsEditing(false);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      showToast('Image must be smaller than 2MB.', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target?.result as string;
      setDraft((prev) => ({ ...prev, avatarUrl: url }));
    };
    reader.readAsDataURL(file);
  };

  const avatarUrl = isEditing ? draft.avatarUrl : profileExt.avatarUrl;
  const userInitials = user ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase() : 'U';
  const fullName = user ? `${user.firstName} ${user.lastName}` : 'Your Name';

  const editableField = (
    key: keyof typeof draft,
    label: string,
    options?: { type?: string; placeholder?: string; as?: 'textarea' | 'select'; selectOptions?: string[] }
  ) => {
    const val = draft[key] as string;
    const error = errors[key as string];
    if (!isEditing) {
      return <FieldRow label={label} value={val} />;
    }
    if (options?.as === 'textarea') {
      return (
        <div>
          <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">{label}</label>
          <textarea
            rows={3}
            value={val}
            onChange={(e) => setDraft((p) => ({ ...p, [key]: e.target.value }))}
            placeholder={options?.placeholder}
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-500 resize-none"
          />
          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
      );
    }
    if (options?.as === 'select') {
      return (
        <div>
          <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">{label}</label>
          <div className="relative">
            <select
              value={val}
              onChange={(e) => setDraft((p) => ({ ...p, [key]: e.target.value }))}
              className="w-full appearance-none rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm px-3 py-2 pr-8 focus:outline-none focus:ring-1 focus:ring-brand-500"
            >
              <option value="">Select {label}</option>
              {options.selectOptions?.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400 pointer-events-none" />
          </div>
        </div>
      );
    }
    return (
      <div>
        <Input
          label={label}
          type={options?.type || 'text'}
          value={val}
          placeholder={options?.placeholder}
          onChange={(e) => setDraft((p) => ({ ...p, [key]: e.target.value }))}
          error={error}
        />
      </div>
    );
  };

  // ── Document title
  useEffect(() => {
    document.title = 'Profile | CareerPilot';
    return () => { document.title = 'CareerPilot'; };
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-10">
      {toast && <Toast {...toast} />}

      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">Your Profile</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">Manage your personal details, education, and career information.</p>
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" size="sm" onClick={handleCancel}>
                <X className="h-4 w-4 mr-1.5" /> Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-1.5" /> Save Changes
              </Button>
            </>
          ) : (
            <Button variant="primary" size="sm" onClick={() => setIsEditing(true)}>
              <Edit3 className="h-4 w-4 mr-1.5" /> Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Left Column: Avatar Card ─────────────────────────────────── */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              {/* Avatar */}
              <div className="relative group">
                <div className="h-24 w-24 rounded-full border-4 border-white dark:border-zinc-800 shadow-lg overflow-hidden bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl select-none">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="Profile" className="h-full w-full object-cover" />
                  ) : (
                    userInitials
                  )}
                </div>
                {isEditing && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 rounded-full flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity text-white"
                  >
                    <Camera className="h-6 w-6" />
                  </button>
                )}
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
              </div>
              {isEditing && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1.5 text-xs text-brand-600 dark:text-brand-400 font-medium hover:underline"
                >
                  <Upload className="h-3.5 w-3.5" /> Change Photo
                </button>
              )}

              <div>
                <h3 className="font-bold text-zinc-900 dark:text-zinc-50 text-lg leading-tight">{fullName}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">{profileExt.currentRole || 'No role set'}</p>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">{profileExt.location || 'No location set'}</p>
              </div>

              {/* Status Badges */}
              <div className="flex flex-wrap justify-center gap-2 w-full">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Active
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 capitalize">
                  <Shield className="h-3 w-3" /> {user?.role?.toLowerCase() || 'user'}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Account Info Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500"><Clock className="h-4 w-4" /></div>
                <CardTitle className="text-base">Account Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <FieldRow
                label="Email Address"
                value={user?.email}
                icon={<Mail className="h-3.5 w-3.5" />}
              />
              <FieldRow
                label="Account Created"
                value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
                icon={<Calendar className="h-3.5 w-3.5" />}
              />
              <FieldRow
                label="Last Login"
                value={profileExt.lastLogin ? new Date(profileExt.lastLogin).toLocaleString() : 'N/A'}
                icon={<Clock className="h-3.5 w-3.5" />}
              />
              <FieldRow
                label="Account Status"
                value={profileExt.accountStatus === 'active' ? '✓ Active' : '⚠ Suspended'}
              />
              <FieldRow
                label="Account Role"
                value={user?.role || 'USER'}
                icon={<Shield className="h-3.5 w-3.5" />}
              />
            </CardContent>
          </Card>
        </div>

        {/* ── Right Column: Detail Sections ───────────────────────────── */}
        <div className="lg:col-span-2 space-y-6">

          {/* Personal Information */}
          <ProfileSection icon={<User className="h-4 w-4" />} title="Personal Information" description="Your basic personal details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {isEditing ? (
                <>
                  <div>
                    <Input
                      label="First Name"
                      value={draft.firstName}
                      onChange={(e) => setDraft((p) => ({ ...p, firstName: e.target.value }))}
                      error={errors.firstName}
                    />
                  </div>
                  <div>
                    <Input
                      label="Last Name"
                      value={draft.lastName}
                      onChange={(e) => setDraft((p) => ({ ...p, lastName: e.target.value }))}
                      error={errors.lastName}
                    />
                  </div>
                </>
              ) : (
                <>
                  <FieldRow label="First Name" value={user?.firstName} />
                  <FieldRow label="Last Name" value={user?.lastName} />
                </>
              )}
              {/* Read-only email */}
              <div className={isEditing ? 'md:col-span-2' : ''}>
                <div>
                  {isEditing ? (
                    <div>
                      <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">Email Address</label>
                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/60 text-zinc-500 dark:text-zinc-400 text-sm">
                        <Mail className="h-4 w-4 shrink-0" />
                        <span>{user?.email}</span>
                        <span className="ml-auto text-xs bg-zinc-200 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400 px-1.5 py-0.5 rounded">Read-only</span>
                      </div>
                    </div>
                  ) : (
                    <FieldRow label="Email Address" value={user?.email} icon={<Mail className="h-3.5 w-3.5" />} />
                  )}
                </div>
              </div>
              <div>{editableField('phone', 'Phone Number', { type: 'tel', placeholder: '+1 (555) 000-0000' })}</div>
              <div>{editableField('dateOfBirth', 'Date of Birth', { type: 'date' })}</div>
              <div>{editableField('gender', 'Gender', { as: 'select', selectOptions: ['Male', 'Female', 'Non-binary', 'Prefer not to say'] })}</div>
              <div>{editableField('location', 'Location', { placeholder: 'City, Country' })}</div>
              <div className="md:col-span-2">
                {editableField('bio', 'Bio', { as: 'textarea', placeholder: 'Tell us a little about yourself…' })}
              </div>
            </div>
          </ProfileSection>

          {/* Education */}
          <ProfileSection icon={<BookOpen className="h-4 w-4" />} title="Education" description="Your academic background">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">{editableField('degree', 'Degree / Qualification', { placeholder: 'B.Tech Computer Science' })}</div>
              <div className="md:col-span-2">{editableField('college', 'College / University', { placeholder: 'MIT, Stanford…' })}</div>
              <div>{editableField('graduationYear', 'Graduation Year', { placeholder: '2024' })}</div>
              <div>{editableField('cgpa', 'CGPA / Percentage', { placeholder: '8.5 / 85%' })}</div>
            </div>
          </ProfileSection>

          {/* Professional Information */}
          <ProfileSection icon={<Briefcase className="h-4 w-4" />} title="Professional Information" description="Your work experience and skills">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>{editableField('currentRole', 'Current Role', { placeholder: 'Software Engineer' })}</div>
              <div>{editableField('experience', 'Experience', { as: 'select', selectOptions: ['Fresher', '< 1 year', '1-2 years', '2-5 years', '5-10 years', '10+ years'] })}</div>
              <div className="md:col-span-2">
                <div>
                  <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2">Skills</label>
                  <SkillTags
                    skills={isEditing ? draft.skills : (profileExt.skills || [])}
                    onChange={(skills) => setDraft((p) => ({ ...p, skills }))}
                    editing={isEditing}
                  />
                </div>
              </div>
              <div>{editableField('certifications', 'Certifications', { placeholder: 'AWS, Google Cloud, PMP…' })}</div>
              <div>{editableField('languages', 'Languages', { placeholder: 'English, Tamil, Hindi…' })}</div>
            </div>
          </ProfileSection>

          {/* Resume */}
          <ProfileSection icon={<FileText className="h-4 w-4" />} title="Resume" description="Your active resume and upload status">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>{editableField('activeResume', 'Active Resume Name', { placeholder: 'My_Resume_2024.pdf' })}</div>
              <div>
                {isEditing ? (
                  editableField('resumeStatus', 'Resume Status', { as: 'select', selectOptions: ['active', 'pending', 'outdated'] })
                ) : (
                  <FieldRow
                    label="Resume Status"
                    value={
                      profileExt.resumeStatus === 'active' ? '✓ Active'
                      : profileExt.resumeStatus === 'outdated' ? '⚠ Outdated'
                      : '⏳ Pending'
                    }
                  />
                )}
              </div>
              <div>{editableField('resumeLastUpdated', 'Last Updated', { type: 'date' })}</div>
              <div className="flex items-end">
                <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/resumes/upload')}>
                  <Upload className="h-4 w-4 mr-2" /> Replace / Upload Resume
                </Button>
              </div>
            </div>
          </ProfileSection>

        </div>
      </div>
    </div>
  );
};

export default Profile;
