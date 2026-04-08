import { createServer } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const supabase = createServer();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return redirect('/login');
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-3xl font-bold dark:text-white">Welcome to Your Dashboard</h1>
        <div className="mt-8">
          <p className="text-lg dark:text-zinc-300">
            Your private stories will appear here.
          </p>
        </div>
      </main>
    </div>
  );
}
