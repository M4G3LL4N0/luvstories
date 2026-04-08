import { createServer } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import StoriesList from '@/components/stories/StoriesList';
import { seedInitialStory } from '@/lib/supabase/seed';

export default async function Dashboard() {
  const supabase = createServer();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  // Seed first story for demo purposes
  await seedInitialStory(supabase, session.user.id);

  const { data: stories } = await supabase
    .from('stories')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false });

  return (
    <div className="flex flex-col flex-1 bg-zinc-50 dark:bg-black min-h-screen">
      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold dark:text-white mb-8">Your Private Stories</h1>
          <StoriesList stories={stories || []} />
        </div>
      </main>
    </div>
  );
}
