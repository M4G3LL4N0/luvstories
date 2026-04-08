import { createClient } from '@/lib/supabase/client';
import { redirect } from 'next/navigation';

export default async function AuthCallback() {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-3xl font-bold dark:text-white">Authenticating...</h1>
      </main>
    </div>
  );
}
