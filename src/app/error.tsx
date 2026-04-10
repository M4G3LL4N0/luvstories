'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-[#050816] px-6 py-16 text-white">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
        <div className="text-sm uppercase tracking-[0.2em] text-white/45">
          Runtime error
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
          This page hit a server-side problem
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65">
          The app is live, but one of the private runtime dependencies is still
          failing. Use the button below after applying the next fix or checking
          runtime logs.
        </p>

        <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/70">
          {error.message || 'Unknown error'}
        </div>

        <button
          onClick={() => reset()}
          className="mt-6 inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white px-6 py-3 text-sm font-medium text-black transition hover:scale-[1.01]"
        >
          Reload
        </button>
      </div>
    </main>
  );
}
