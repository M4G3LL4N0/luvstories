type StoryRow = {
  id: string;
  user_id: string;
  title: string;
  status: string | null;
  privacy_level: string | null;
  updated_at: string | null;
};

type SupabaseLike = {
  from: (table: string) => {
    select: (columns: string) => {
      eq: (column: string, value: string) => {
        maybeSingle: () => Promise<{ data: StoryRow | null; error: unknown }>;
      };
    };
    insert: (
      values:
        | Record<string, unknown>
        | Array<Record<string, unknown>>
    ) => Promise<{ error: unknown }>;
  };
};

export async function seedInitialStory(
  supabase: SupabaseLike,
  userId: string
) {
  const { data: existingStory, error: existingStoryError } = await supabase
    .from('stories')
    .select('id, user_id, title, status, privacy_level, updated_at')
    .eq('user_id', userId)
    .maybeSingle();

  if (existingStoryError) {
    console.error('Error checking existing story:', existingStoryError);
    return;
  }

  if (existingStory) {
    return;
  }

  const { error: insertError } = await supabase.from('stories').insert({
    user_id: userId,
    title: 'Me & Val',
    status: 'active',
    privacy_level: 'private',
  });

  if (insertError) {
    console.error('Error seeding initial story:', insertError);
  }
}
