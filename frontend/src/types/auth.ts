export interface UserDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'USER' | 'ADMIN';
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password?: string;
}

export interface RegisterRequest {
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface AuthResponse {
  token: string;
  type: string; // e.g., "Bearer"
  user: UserDto;
}

/** Extended profile data stored locally (not yet synced to backend) */
export interface UserProfileExt {
  // Personal
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  location?: string;
  bio?: string;
  avatarUrl?: string; // base64 data URL or remote URL

  // Education
  degree?: string;
  college?: string;
  graduationYear?: string;
  cgpa?: string;

  // Professional
  currentRole?: string;
  experience?: string;
  skills?: string[];
  certifications?: string;
  languages?: string;

  // Resume
  activeResume?: string;
  resumeStatus?: 'active' | 'pending' | 'outdated';
  resumeLastUpdated?: string;

  // Meta
  lastLogin?: string;
  accountStatus?: 'active' | 'suspended';
}
