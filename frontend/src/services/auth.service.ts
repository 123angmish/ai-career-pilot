import axios from 'axios';
import api from './api';
import type { LoginRequest, RegisterRequest, AuthResponse, UserDto } from '../types/auth';
import type { ApiResponse, ApiError } from '../types/common';

/** Extract a readable message from any Axios error response */
export function extractAuthError(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as ApiError | undefined;
    if (data?.message) return data.message;
    if (err.response?.status === 401) return 'Invalid email or password.';
    if (err.response?.status === 409) return 'An account with this email already exists.';
    if (err.response?.status === 400) return 'Please check your input and try again.';
  }
  return 'Something went wrong. Please try again.';
}

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<any>>('/api/users/login', credentials);
    const raw = response.data.data;
    const nameParts = (raw.fullName || '').trim().split(/\s+/);
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    return {
      token: raw.token,
      type: 'Bearer',
      user: {
        id: '',
        email: raw.email,
        firstName,
        lastName,
        role: 'USER',
        createdAt: '',
        updatedAt: '',
      }
    };
  },

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const payload = {
      fullName: `${userData.firstName} ${userData.lastName}`.trim(),
      email: userData.email,
      password: userData.password,
      phoneNumber: userData.phoneNumber,
    };
    const response = await api.post<ApiResponse<any>>('/api/users/register', payload);
    const raw = response.data.data;
    const nameParts = (raw.fullName || '').trim().split(/\s+/);
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    return {
      token: raw.token,
      type: 'Bearer',
      user: {
        id: '',
        email: raw.email,
        firstName,
        lastName,
        role: 'USER',
        createdAt: '',
        updatedAt: '',
      }
    };
  },

  async getCurrentUser(): Promise<UserDto> {
    const response = await api.get<ApiResponse<any>>('/api/users/profile');
    const raw = response.data.data;
    const nameParts = (raw.fullName || '').trim().split(/\s+/);
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    return {
      id: String(raw.id),
      email: raw.email,
      firstName,
      lastName,
      role: raw.role === 'ROLE_ADMIN' ? 'ADMIN' : 'USER',
      createdAt: '',
      updatedAt: '',
    };
  },

  logout(): void {
    localStorage.removeItem('cp_token');
    localStorage.removeItem('cp_user');
  },
};

