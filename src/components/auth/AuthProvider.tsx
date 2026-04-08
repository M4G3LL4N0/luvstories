'use client';

import type { Session } from '@supabase/supabase-js';
import { createContext, useContext, type ReactNode } from 'react';

const AuthContext = createContext<Session | null>(null);

export function AuthProvider({
  children,
  session,
}: {
  children: ReactNode;
  session: Session | null;
}) {
  return (
    <AuthContext.Provider value={session}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
