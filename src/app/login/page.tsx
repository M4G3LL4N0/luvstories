import { createClient } from '@/lib/supabase/client';
import { redirect } from 'next/navigation';

export default function Login() {
  const supabase = createClient();

  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-3xl font-bold dark:text-white">LuvStories</h1>
        <button
          onClick={handleSignIn}
          className="mt-8 px-6 py-3 bg-black text-white dark:bg-white dark:text-black rounded-lg font-medium"
        >
          Sign in with GitHub
        </button>
      </main>
    </div>
  );
}
