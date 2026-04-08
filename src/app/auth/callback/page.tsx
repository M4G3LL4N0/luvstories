import { createServer } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function AuthCallback() {
  const supabase = createServer();
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error) {
    redirect('/login?error=auth_failed');
  }

  if (session) {
    // Create user profile if it doesn't exist
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: session.user.id,
        email: session.user.email,
        updated_at: new Date().toISOString()
      });

    if (!profileError) {
      redirect('/dashboard');
    }
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-3xl font-bold dark:text-white">Authenticating...</h1>
        {error && (
          <p className="mt-4 text-red-500">Authentication failed. Please try again.</p>
        )}
      </main>
    </div>
  );
}
