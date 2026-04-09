'use client';

import { createContext, useContext } from 'react';
import type { Session, User } from '@supabase/supabase-js';

export type AuthContextType = {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  refreshSession: () => Promise<void>;
  logout: () => Promise<void>;
};

const noopAsync = async () => {};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  isLoading: false,
  error: null,
  refreshSession: noopAsync,
  logout: noopAsync,
});

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
