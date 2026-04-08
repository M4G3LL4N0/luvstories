import { redirect } from 'next/navigation';
import { createServer } from '@/lib/supabase/server';

export default async function AuthCallback() {
  const supabase = await createServer();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/login?error=auth_failed');
  }

  redirect('/dashboard');
}
