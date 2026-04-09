import { createServer } from './server';

export async function seedInitialStory(userId: string) {
  const supabase = await createServer();

  try {
    // Check if user already has stories
    const { count, error: countError } = await supabase
      .from('stories')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    if (countError) throw countError;
    if (count && count > 0) return;

    // Create initial story in a transaction
    const { data: story, error: storyError } = await supabase
      .from('stories')
      .insert({
        user_id: userId,
        title: 'Me & Val',
        status: 'active',
        privacy_level: 'private',
        is_encrypted: false
      })
      .select('id')
      .single();

    if (storyError || !story) throw storyError || new Error('Failed to create story');

    // Seed all related data
    await Promise.all([
      supabase.from('story_profiles').insert({
        story_id: story.id,
        user_id: userId,
        subject_name: 'Val',
        relationship_type: 'Romantic',
        summary: 'Our journey together',
        is_encrypted: false
      }),
      supabase.from('story_events').insert([
        {
          story_id: story.id,
          user_id: userId,
          title: 'First Meeting',
          description: 'We met at a coffee shop',
          event_type: 'milestone',
          emotional_tone: 'happy',
          impact_score: 80,
          occurred_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          is_encrypted: false
        },
        {
          story_id: story.id,
          user_id: userId,
          title: 'First Date',
          description: 'Dinner at our favorite restaurant',
          event_type: 'milestone',
          emotional_tone: 'excited',
          impact_score: 85,
          occurred_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
          is_encrypted: false
        }
      ]),
      supabase.from('story_scores').insert({
        story_id: story.id,
        user_id: userId,
        trust_score: 75,
        consistency_score: 80,
        reciprocity_score: 70,
        attraction_score: 85,
        emotional_safety_score: 65,
        volatility_score: 40,
        repair_potential_score: 80,
        relationship_potential_score: 75
      })
    ]);

  } catch (error) {
    console.error('Error seeding initial story:', error);
    throw new Error('Failed to seed initial story data');
  }
}
