import { redirect } from 'next/navigation';
import StoriesList from '@/components/stories/StoriesList';
import { createServer } from '@/lib/supabase/server';

type Story = {
  id: string;
  title: string;
  status?: string | null;
  privacy_level?: string | null;
  updated_at?: string | null;
};

export default async function Dashboard() {
  try {
    const supabase = await createServer();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      redirect('/login');
    }

    const { data: existingStory, error: existingStoryError } = await supabase
      .from('stories')
      .select('id')
      .eq('user_id', user.id)
      .limit(1)
      .maybeSingle();

    if (!existingStoryError && !existingStory) {
      await supabase.from('stories').insert({
        user_id: user.id,
        title: 'Me & Val',
        status: 'active',
        privacy_level: 'private',
      });
    }

    const { data, error } = await supabase
      .from('stories')
      .select('id, title, status, privacy_level, updated_at')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });

    const stories: Story[] = error || !data ? [] : data;

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

          <StoriesList stories={stories} />
        </div>
      </main>
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unknown runtime error';

    return (
      <main className="min-h-screen bg-[#050816] px-6 py-16 text-white">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
          <div className="text-sm uppercase tracking-[0.2em] text-white/45">
            Dashboard
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
            Setup still needs one more step
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65">
            The private dashboard is not ready yet. This usually means the
            Supabase environment variables, authentication wiring, or database
            tables are not fully set up in production.
          </p>

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/70">
            Runtime detail: {message}
          </div>
        </div>
      </main>
    );
  }
}
