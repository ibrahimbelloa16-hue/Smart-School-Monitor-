import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types/index.ts';
import { apiRequest, getAuthToken, setAuthToken, clearAuthToken } from '../lib/api.ts';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  hideBalance: boolean;
  toggleHideBalance: () => void;
  login: (token: string, user: User) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
  updateBalance: (newBalanceNaira: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(getAuthToken());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hideBalance, setHideBalance] = useState<boolean>(() => {
    try {
      return localStorage.getItem('standard_vtu_hide_balance') === 'true';
    } catch {
      return false;
    }
  });

  const toggleHideBalance = () => {
    setHideBalance(prev => {
      const next = !prev;
      try {
        localStorage.setItem('standard_vtu_hide_balance', String(next));
      } catch (e) {
        // ignore localStorage errors
      }
      return next;
    });
  };

  const refreshUser = async () => {
    const currentToken = getAuthToken();
    if (!currentToken) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const data = await apiRequest<{ user: User }>('/auth/me');
      setUser(data.user);
    } catch (err) {
      console.warn('Failed to load user session, clearing token');
      clearAuthToken();
      setToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = (newToken: string, newUser: User) => {
    setAuthToken(newToken);
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    clearAuthToken();
    setToken(null);
    setUser(null);
  };

  const updateBalance = (newBalanceNaira: number) => {
    setUser(prev => prev ? { ...prev, balanceNaira: newBalanceNaira, balanceKobo: Math.round(newBalanceNaira * 100) } : null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, hideBalance, toggleHideBalance, login, logout, refreshUser, updateBalance }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
