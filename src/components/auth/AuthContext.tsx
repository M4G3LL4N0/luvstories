'use client';

import { createContext, useContext, type ReactNode, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Session } from '@supabase/supabase-js';

type AuthContextType = {
  session: Session | null;
  user: {
    id: string;
    email?: string | null;
  } | null;
  isLoading: boolean;
  error: Error | null;
  refreshSession: () => Promise<Session | null>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  isLoading: false,
  error: null,
});

export function AuthProvider({
  children,
  session,
}: {
  children: ReactNode;
  session: Session | null;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const user = session?.user ?? null;
  const supabase = createClient();

  const refreshSession = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.refreshSession();
      if (error) throw error;
      return data.session;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [supabase]);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [supabase]);

  return (
    <AuthContext.Provider value={{ 
      session, 
      user,
      isLoading,
      error,
      refreshSession,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
