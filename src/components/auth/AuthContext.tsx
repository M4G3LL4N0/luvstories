'use client';

import { createContext, useContext, type ReactNode } from 'react';

type AuthUser = {
  id: string;
  email?: string | null;
} | null;

const AuthContext = createContext<AuthUser>(null);

export function AuthProvider({
  children,
  user,
}: {
  children: ReactNode;
  user: AuthUser;
}) {
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
