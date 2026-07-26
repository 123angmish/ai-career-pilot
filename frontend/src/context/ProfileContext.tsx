import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { UserProfileExt } from '../types/auth';

const STORAGE_KEY = 'cp_profile_ext';

interface ProfileContextType {
  profileExt: UserProfileExt;
  updateProfileExt: (updates: Partial<UserProfileExt>) => void;
  resetProfileExt: () => void;
}

const defaultProfile: UserProfileExt = {
  phone: '',
  dateOfBirth: '',
  gender: '',
  location: '',
  bio: '',
  avatarUrl: '',
  degree: '',
  college: '',
  graduationYear: '',
  cgpa: '',
  currentRole: '',
  experience: '',
  skills: [],
  certifications: '',
  languages: '',
  activeResume: '',
  resumeStatus: 'pending',
  resumeLastUpdated: '',
  lastLogin: new Date().toISOString(),
  accountStatus: 'active',
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profileExt, setProfileExt] = useState<UserProfileExt>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultProfile, ...JSON.parse(saved) };
      }
    } catch {
      // Ignore parse errors
    }
    return defaultProfile;
  });

  // Persist to localStorage whenever profileExt changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profileExt));
    } catch {
      // Storage may be full
    }
  }, [profileExt]);

  const updateProfileExt = useCallback((updates: Partial<UserProfileExt>) => {
    setProfileExt((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetProfileExt = useCallback(() => {
    setProfileExt(defaultProfile);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <ProfileContext.Provider value={{ profileExt, updateProfileExt, resetProfileExt }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
