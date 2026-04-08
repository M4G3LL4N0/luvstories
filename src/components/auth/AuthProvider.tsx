'use client';

import { Session } from '@supabase/auth-helpers-nextjs';
import { createContext, useContext, ReactNode } from 'react';

const AuthContext = createContext<Session | null>(null);

export function AuthProvider({
  session,
  children,
}: {
  session: Session | null;
  children: ReactNode;
}) {
  return (
    <AuthContext.Provider value={session}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
