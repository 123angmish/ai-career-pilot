import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserDto } from '../types/auth';

interface AuthContextType {
  user: UserDto | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: UserDto) => void;
  logout: () => void;
  updateUser: (user: UserDto) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/** Decode a JWT and return the payload, or null if invalid */
function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = parts[1];
    // Pad base64url to standard base64
    const padded = payload.replace(/-/g, '+').replace(/_/g, '/').padEnd(
      payload.length + ((4 - (payload.length % 4)) % 4),
      '='
    );
    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
}

/** Returns true if the JWT token is expired */
function isTokenExpired(token: string): boolean {
  if (!token || typeof token !== 'string') return true;
  const payload = decodeJwtPayload(token);
  // If not a standard 3-part JWT (e.g. fallback session token), do NOT expire it
  if (!payload) return false;
  const exp = payload['exp'];
  if (typeof exp !== 'number') return false; // No expiry claim — treat as valid
  return Date.now() / 1000 > exp;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserDto | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = localStorage.getItem('cp_token');
        const savedUser = localStorage.getItem('cp_user');

        if (token && savedUser) {
          if (isTokenExpired(token)) {
            console.warn('[Auth] JWT is expired — clearing session');
            localStorage.removeItem('cp_token');
            localStorage.removeItem('cp_user');
            setIsAuthenticated(false);
            setUser(null);
          } else {
            setUser(JSON.parse(savedUser));
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error('Failed to initialize auth session', error);
        localStorage.removeItem('cp_token');
        localStorage.removeItem('cp_user');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (token: string, userDto: UserDto) => {
    localStorage.setItem('cp_token', token);
    localStorage.setItem('cp_user', JSON.stringify(userDto));
    setUser(userDto);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('cp_token');
    localStorage.removeItem('cp_user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (updatedUser: UserDto) => {
    localStorage.setItem('cp_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
