import { redirect } from 'next/navigation';
import StoriesList from '@/components/stories/StoriesList';
import { createServer } from '@/lib/supabase/server';

export default async function Dashboard() {
  const supabase = await createServer();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect('/login');
  }

  // Check if user has any stories
  const { data: stories, error } = await supabase
    .from('stories')
    .select('id, title, status, privacy_level, updated_at')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false });

  if (error || !stories || stories.length === 0) {
    // Seed initial story if none exist
    const { data: newStory } = await supabase
      .from('stories')
      .insert({
        user_id: user.id,
        title: 'Me & Val',
        status: 'active',
        privacy_level: 'private',
      })
      .select('id')
      .single();

    if (newStory) {
      // Create initial profile
      await supabase.from('story_profiles').insert({
        story_id: newStory.id,
        user_id: user.id,
        subject_name: 'Val',
        relationship_type: 'Romantic',
        summary: 'Our journey together',
      });

      // Create initial scores
      await supabase.from('story_scores').insert({
        story_id: newStory.id,
        user_id: user.id,
        trust_score: 75,
        consistency_score: 80,
        reciprocity_score: 70,
        attraction_score: 85,
        emotional_safety_score: 65,
        volatility_score: 40,
        repair_potential_score: 80,
        relationship_potential_score: 75,
      });
    }
  }

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8">
          <div className="text-sm uppercase tracking-[0.2em] text-white/45">
            Dashboard
          </div>
          <h1 className="mt-2 text-4xl font-semibold tracking-[-0.03em]">
            Welcome back
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65">
            Your stories are private to your account and designed for personal
            reflection, clarity, and better relationship decisions.
          </p>
        </div>

        <StoriesList stories={stories || []} />
      </div>
    </main>
  );
}
