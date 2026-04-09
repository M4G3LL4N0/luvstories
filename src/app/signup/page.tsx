import Link from "next/link";

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(130,86,255,0.22),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(255,70,120,0.18),transparent_24%),linear-gradient(to_bottom,#070b1a,#050816,#03050d)]" />
      <div className="mx-auto flex min-h-screen max-w-4xl items-center px-6 py-16">
        <div className="w-full rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 md:p-10">
          <div className="text-sm uppercase tracking-[0.2em] text-white/45">
            Sign up
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em]">
            Create your private workspace
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65">
            Account creation UI will be activated after Supabase production
            configuration is completed.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white px-6 py-3 text-sm font-medium text-black transition hover:scale-[1.01]"
            >
              Back to home
            </Link>

            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white/90 transition hover:bg-white/10"
            >
              Go to login
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
