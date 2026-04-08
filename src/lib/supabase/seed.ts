import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { encryptData } from './server';

export async function seedInitialStory(supabase: ReturnType<typeof createPagesServerClient>, userId: string) {
  // Check if initial story already exists
  const { data: existing } = await supabase
    .from('stories')
    .select('id')
    .eq('title', 'Project Val')
    .eq('user_id', userId)
    .single();

  if (!existing) {
    const encryptedContent = await encryptData(
      "This is your first private story. Only you can see this content."
    );
    
    await supabase
      .from('stories')
      .insert({
        user_id: userId,
        title: 'Project Val',
        content: encryptedContent,
        is_private: true
      });
  }
}
