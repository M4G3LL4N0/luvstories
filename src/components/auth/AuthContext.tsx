'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';

type AuthContextType = {
  session: Session | null;
  user: {
    id: string;
    email?: string | null;
  } | null;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
});

export function AuthProvider({
  children,
  session,
}: {
  children: ReactNode;
  session: Session | null;
}) {
  const user = session?.user ?? null;
  
  return (
    <AuthContext.Provider value={{ session, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
