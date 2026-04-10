import Link from "next/link";

const featureCards = [
  {
    title: "Private Relationship Workspace",
    body: "Each story is a secure, private workspace for organizing messages, memories, and insights about a relationship.",
    icon: "window.svg"
  },
  {
    title: "Timeline Reconstruction",
    body: "Build a clear timeline of key moments, turning points, and patterns to understand how the relationship evolved.",
    icon: "globe.svg"
  },
  {
    title: "Insightful Notes & Reports",
    body: "Add private notes, generate relationship reports, and track important details with end-to-end encryption.",
    icon: "file.svg"
  },
  {
    title: "Relationship Scoring",
    body: "Track key relationship health metrics like trust, stability, and emotional safety over time.",
    icon: "vercel.svg"
  },
  {
    title: "Future Story Paths",
    body: "See likely trajectories, risks, and opportunities based on current patterns and choices.",
    icon: "next.svg"
  },
  {
    title: "Privacy-First Architecture",
    body: "Built with row-level security, encrypted storage, and strict access controls to protect your sensitive data.",
    icon: "file.svg"
  },
];

const pillars = [
  "Timeline reconstruction",
  "Relationship dashboards",
  "Signal and pattern detection",
  "Message coaching",
  "Future path modeling",
  "Private account workspaces",
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(130,86,255,0.22),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(255,70,120,0.18),transparent_24%),linear-gradient(to_bottom,#070b1a,#050816,#03050d)]" />

      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="text-xl font-semibold tracking-[0.18em] text-white/95">
            LUVSTORIES
          </div>

          <nav className="hidden gap-6 text-sm text-white/70 md:flex">
            <a href="#product" className="transition hover:text-white">
              Product
            </a>
            <a href="#privacy" className="transition hover:text-white">
              Privacy
            </a>
            <a href="#future" className="transition hover:text-white">
              Future
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
        <div>
          <div className="mb-5 inline-flex rounded-full border border-pink-400/20 bg-pink-400/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-pink-200">
            Private Relationship Intelligence
          </div>

          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.03] tracking-[-0.04em] text-white md:text-7xl">
            Build, understand, and shape your love story.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70 md:text-xl">
            LuvStories turns moments, messages, conflicts, and memories into a
            private relationship workspace with timelines, insight, visual
            dashboards, and future story paths.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white px-6 py-3 text-sm font-medium text-black transition hover:scale-[1.01]"
            >
              Log In
            </Link>

            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white/90 transition hover:bg-white/10"
            >
              Create Account
            </Link>
          </div>

          <div className="mt-10 grid max-w-2xl grid-cols-1 gap-3 text-sm text-white/65 sm:grid-cols-2">
            {pillars.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-4 shadow-2xl shadow-fuchsia-950/30 backdrop-blur">
            <div className="rounded-[1.6rem] border border-white/10 bg-[#0b1020]/95 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-white/45">
                    Story Dashboard
                  </div>
                  <div className="mt-1 text-2xl font-semibold">Ethan &amp; Mia</div>
                </div>
                <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
                  Private
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <MetricCard label="Story Health" value="62" sub="Developing" />
                <MetricCard label="Instability" value="71" sub="High" />
                <MetricCard label="Repair Potential" value="68" sub="Possible" />
                <MetricCard label="Clarity" value="44" sub="Low" />
              </div>

              <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.04] p-4">
                <div className="text-sm font-medium text-white/85">
                  Current Story Insight
                </div>
                <p className="mt-2 text-sm leading-7 text-white/65">
                  Strong emotional engagement exists, but the pattern currently
                  favors volatility over stability. The healthiest next move is
                  calm, grounded consistency rather than pressure or escalation.
                </p>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_0.85fr]">
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="mb-4 text-sm font-medium text-white/85">
                    Story Arc
                  </div>
                  <div className="flex h-40 items-end gap-2">
                    {[25, 48, 40, 72, 38, 66, 55, 80, 43, 61, 58, 70].map(
                      (height, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t-2xl bg-gradient-to-t from-fuchsia-500/40 via-violet-400/60 to-cyan-300/70"
                          style={{ height: `${height}%` }}
                        />
                      )
                    )}
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="text-sm font-medium text-white/85">
                    Best Next Move
                  </div>
                  <p className="mt-2 text-sm leading-7 text-white/65">
                    Reduce emotional overload. Keep messages simple, warm, and
                    non-pressuring. Build stability before trying to force
                    certainty.
                  </p>

                  <div className="mt-5 text-sm font-medium text-white/85">
                    Most Likely Story Path
                  </div>
                  <div className="mt-2 rounded-2xl border border-amber-300/15 bg-amber-300/10 px-3 py-2 text-sm text-amber-100">
                    Loop Path — high intensity, inconsistent clarity
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-fuchsia-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl" />
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 max-w-3xl">
          <div className="text-sm uppercase tracking-[0.2em] text-white/40">
            How It Works
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
            Transform moments into meaningful patterns
          </h2>
          <p className="mt-4 text-lg leading-8 text-white/65">
            LuvStories helps you track, analyze and understand relationship patterns through a simple 3-step process:
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
            <div className="text-xl font-semibold">1. Add Moments</div>
            <p className="mt-3 text-sm leading-7 text-white/65">
              Record key events, messages, and interactions with timestamps and emotional context.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
            <div className="text-xl font-semibold">2. Build Timeline</div>
            <p className="mt-3 text-sm leading-7 text-white/65">
              See your relationship story unfold chronologically with automatic pattern detection.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
            <div className="text-xl font-semibold">3. Gain Insight</div>
            <p className="mt-3 text-sm leading-7 text-white/65">
              Get scores, reports and future path modeling based on your unique data.
            </p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
            <div className="text-xl font-semibold">1. Add Moments</div>
            <p className="mt-3 text-sm leading-7 text-white/65">
              Record key events, messages, and interactions with timestamps and emotional context.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
            <div className="text-xl font-semibold">2. Build Timeline</div>
            <p className="mt-3 text-sm leading-7 text-white/65">
              See your relationship story unfold chronologically with automatic pattern detection.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
            <div className="text-xl font-semibold">3. Gain Insight</div>
            <p className="mt-3 text-sm leading-7 text-white/65">
              Get scores, reports and future path modeling based on your unique data.
            </p>
          </div>
        </div>
      </section>

      <section id="product" className="mx-auto max-w-7xl px-6 py-6 lg:py-10">
        <div className="mb-8 max-w-2xl">
          <div className="text-sm uppercase tracking-[0.2em] text-white/40">
            Product
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
            A private operating system for relationship clarity
          </h2>
          <p className="mt-4 text-lg leading-8 text-white/65">
            Designed for those who want to understand their relationships with the same rigor they apply to other important areas of life.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featureCards.map((card) => (
            <div
              key={card.title}
              className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6"
            >
              <div className="flex items-center gap-3">
                <img 
                  src={`/${card.icon}`}
                  alt=""
                  className="h-6 w-6 opacity-70"
                />
                <div className="text-xl font-semibold">{card.title}</div>
              </div>
              <p className="mt-3 text-sm leading-7 text-white/65">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="privacy" className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="text-sm uppercase tracking-[0.2em] text-white/40">
              Privacy & Security
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
              Your data stays yours, always
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/65">
              We use multiple layers of protection to keep your stories private:
            </p>
            <ul className="mt-4 space-y-3 text-white/65">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/30" />
                <span>Row-level security ensures only you can access your data</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/30" />
                <span>End-to-end encryption for sensitive notes and reports</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/30" />
                <span>No third-party tracking or data sharing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/30" />
                <span>Open-source security model with regular audits</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/30" />
                <span>GDPR-compliant data handling</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/30" />
                <span>Optional local-only storage mode</span>
              </li>
            </ul>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <PrivacyCard
              title="Private by default"
              body="Stories are intended to be account-scoped and inaccessible to anyone else."
            />
            <PrivacyCard
              title="Secure architecture"
              body="Built for row-level protection, encrypted storage, and controlled access patterns."
            />
            <PrivacyCard
              title="Sensitive-data aware"
              body="Designed for highly personal context, notes, and relationship history."
            />
            <PrivacyCard
              title="Founder-aligned"
              body="The first account can be your own live story workspace from day one."
            />
          </div>
        </div>
      </section>

      <section id="testimonials" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-8 max-w-2xl">
          <div className="text-sm uppercase tracking-[0.2em] text-white/40">
            Trusted By
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
            Helping people see clearly
          </h2>
          <p className="mt-4 text-lg leading-8 text-white/65">
            Used by individuals, couples, and professionals to gain clarity and make better relationship decisions.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
            <p className="text-lg italic leading-8 text-white/65">
              "LuvStories helped me see patterns in my relationship I was too close to notice. The timeline visualization was a game-changer."
            </p>
            <div className="mt-4 text-sm font-medium text-white/85">
              — Sarah K., Therapist
            </div>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6">
            <p className="text-lg italic leading-8 text-white/65">
              "Finally a tool that respects privacy while helping me make better relationship decisions."
            </p>
            <div className="mt-4 text-sm font-medium text-white/85">
              — Michael T., Engineer
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-8 max-w-2xl">
          <div className="text-sm uppercase tracking-[0.2em] text-white/40">
            FAQ
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
            Common questions
          </h2>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6">
            <div className="text-lg font-semibold">Is my data really private?</div>
            <p className="mt-2 text-sm leading-7 text-white/65">
              Yes. We use Supabase's row-level security so your data is only accessible to you. Sensitive content is encrypted before being stored.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6">
            <div className="text-lg font-semibold">How does the scoring work?</div>
            <p className="mt-2 text-sm leading-7 text-white/65">
              Scores are calculated based on your input data and known relationship patterns. You control what factors are included.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6">
            <div className="text-lg font-semibold">Can I export my data?</div>
            <p className="mt-2 text-sm leading-7 text-white/65">
              Absolutely. You can export all your stories and data at any time in JSON format.
            </p>
          </div>
        </div>
      </section>

      <section id="cta" className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.03] p-8 md:p-10">
          <div className="max-w-3xl">
            <div className="text-sm uppercase tracking-[0.2em] text-white/40">
              Expansion
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
              Start with one story. Expand into many.
            </h2>
            <p className="mt-4 text-base leading-8 text-white/65 md:text-lg">
              LuvStories starts as a private workspace for one relationship,
              then scales into a reusable story engine for future relationships,
              reflection, decision support, and emotional pattern recognition.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                "Private dashboards",
                "Message coaching",
                "Secure accounts",
                "Story timelines",
                "Future path modeling",
              ].map((tag) => (
                <div
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/70"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function MetricCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
      <div className="text-xs uppercase tracking-[0.18em] text-white/45">
        {label}
      </div>
      <div className="mt-3 text-3xl font-semibold">{value}</div>
      <div className="mt-1 text-sm text-white/55">{sub}</div>
    </div>
  );
}

function PrivacyCard({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
      <div className="text-lg font-semibold">{title}</div>
      <p className="mt-2 text-sm leading-7 text-white/65">{body}</p>
    </div>
  );
}
