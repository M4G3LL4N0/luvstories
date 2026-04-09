type Story = {
  id: string;
  title: string;
  status?: string | null;
  privacy_level?: string | null;
  updated_at?: string | null;
};

function formatDate(value?: string | null) {
  if (!value) return "No recent update";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "No recent update";
  
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export default function StoriesList({ 
  stories,
  isLoading = false 
}: { 
  stories: Story[];
  isLoading?: boolean;
}) {
  if (isLoading) {
    return (
      <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 text-white">
        <div className="text-lg font-semibold">Your stories</div>
        <div className="mt-4 space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-2xl bg-white/10" />
          ))}
        </div>
      </div>
    );
  }

  if (!stories || stories.length === 0) {
    return (
      <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 text-white">
        <div className="text-lg font-semibold">Your stories</div>
        <p className="mt-2 text-sm leading-7 text-white/65">
          No stories yet. Your first private relationship story will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold">Your stories</div>
          <p className="mt-1 text-sm text-white/60">
            Private relationship workspaces tied to your account.
          </p>
        </div>
        <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
          Private
        </div>
      </div>

      <div className="mt-5 grid gap-4">
        {stories.map((story) => (
          <div
            key={story.id}
            className="rounded-2xl border border-white/10 bg-black/20 p-4 transition-all hover:border-white/20 hover:bg-black/30 cursor-pointer"
            onClick={() => {
              // TODO: Handle story click
              console.log('Story clicked:', story.id);
            }}
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-base font-semibold text-white">
                  {story.title}
                </div>
                <div className="mt-1 text-sm text-white/55">
                  Status: {story.status || "active"}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/65">
                  {story.privacy_level || "private"}
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/65">
                  Updated {formatDate(story.updated_at)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
