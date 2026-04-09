import { redirect } from 'next/navigation';
import { createServer } from '@/lib/supabase/server';

export default async function StoryDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createServer();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect('/login');
  }

  // Fetch story details
  const { data: story, error: storyError } = await supabase
    .from('stories')
    .select('*')
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single();

  if (storyError || !story) {
    redirect('/dashboard');
  }

  // Fetch related data
  const { data: profile } = await supabase
    .from('story_profiles')
    .select('*')
    .eq('story_id', params.id)
    .eq('user_id', user.id)
    .single();

  const { data: events } = await supabase
    .from('story_events')
    .select('*')
    .eq('story_id', params.id)
    .eq('user_id', user.id)
    .order('occurred_at', { ascending: false });

  const { data: notes } = await supabase
    .from('story_notes')
    .select('*')
    .eq('story_id', params.id)
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false });

  const { data: scores } = await supabase
    .from('story_scores')
    .select('*')
    .eq('story_id', params.id)
    .eq('user_id', user.id)
    .single();

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-semibold tracking-[-0.03em]">
            {story.title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65">
            {profile?.summary || 'Your private relationship story'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-1">
            <h2 className="mb-4 text-xl font-semibold">Profile</h2>
            <div className="rounded-lg bg-white/10 p-4">
              <p className="text-sm">
                <strong>Subject:</strong> {profile?.subject_name || 'N/A'}
              </p>
              <p className="text-sm mt-2">
                <strong>Type:</strong> {profile?.relationship_type || 'N/A'}
              </p>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h2 className="mb-4 text-xl font-semibold">Timeline</h2>
            <div className="space-y-4">
              {events?.map((event) => (
                <div
                  key={event.id}
                  className="rounded-lg bg-white/10 p-4"
                >
                  <h3 className="font-medium">{event.title}</h3>
                  <p className="text-sm text-white/80">{event.description}</p>
                  <p className="text-xs text-white/60 mt-2">
                    {new Date(event.occurred_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
