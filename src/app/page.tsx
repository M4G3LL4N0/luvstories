import Link from "next/link";
import { ProductHonestyNote } from "@/components/ProductHonestyNote";
import { ProcessFlowSection } from "@/components/ProcessFlowSection";
import { MetricCard } from "@/components/MetricCard";
import { SiteHeader } from "@/components/site-header";

const pillars = [
  "Timeline reconstruction",
  "Relationship dashboards",
  "Signal and pattern detection",
  "Message coaching",
  "Future path modeling",
  "Private account workspaces",
];

const featureCards = [
  {
    title: "Private Story Files",
    body: "Each relationship becomes a private story file—chapters, events, notes, and scores stay in your account, not on a public feed.",
    accent: "from-fuchsia-500/30 to-violet-500/20",
  },
  {
    title: "Story Intelligence",
    body: "Surface emotional patterns, volatility, and repair potential from your own timeline so decisions come from clarity, not confusion.",
    accent: "from-violet-500/30 to-cyan-500/20",
  },
  {
    title: "Possible Story Paths",
    body: "Model where the narrative may head next—loops, repair arcs, or clean breaks—without pretending certainty where it does not exist.",
    accent: "from-cyan-500/25 to-emerald-500/15",
  },
  {
    title: "Privacy First",
    body: "Strong privacy is part of the product, not an afterthought. Owner-scoped data, encryption-ready notes, and no public story pages.",
    accent: "from-pink-500/25 to-rose-500/15",
  },
];

export default function HomePage() {
  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(130,86,255,0.22),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(255,70,120,0.18),transparent_24%),linear-gradient(to_bottom,#070b1a,#050816,#03050d)]" />

      <SiteHeader />

      <section data-stagger className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28" data-reveal>
        <div>
          <div className="mb-5 inline-flex rounded-full border border-pink-400/20 bg-pink-400/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-pink-200">
            Private Relationship Intelligence
          </div>

          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.03] tracking-[-0.04em] text-white md:text-7xl">
            Build, understand, and shape your love story.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70 md:text-xl">
            Turn moments, messages, conflicts, and memories into a private
            relationship workspace—with timelines, insight, visual dashboards,
            and future story paths you control.
          </p>

          <div data-stagger className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/login"
              className="motion-card motion-hover-lift inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white px-6 py-3 text-sm font-medium text-black transition hover:scale-[1.01]"
            >
              Log In
            </Link>

            <Link
              href="/signup"
              className="motion-card motion-hover-lift inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white/90 transition hover:bg-white/10"
            >
              Create Account
            </Link>
          </div>

          <div data-stagger className="mt-10 grid max-w-2xl grid-cols-1 gap-3 text-sm text-white/65 sm:grid-cols-2">
            {pillars.map((item) => (
              <div
                key={item}
                className="motion-card motion-hover-lift rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-4 shadow-2xl shadow-fuchsia-950/30 backdrop-blur-xl">
            <div className="rounded-[1.6rem] border border-white/10 bg-[#0b1020]/95 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-white/45">
                    Story Dashboard
                  </div>
                  <div className="mt-1 text-2xl font-semibold">Ethan &amp; Mia</div>
                  <div className="mt-1 text-xs text-white/45">Sample preview — not a real account</div>
                </div>
                <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
                  Private
                </div>
              </div>

              <div data-stagger className="mt-6 grid gap-4 sm:grid-cols-2">
                <MetricCard label="Story Health" value="Sample" sub="Illustrated" />
                <MetricCard label="Instability" value="Sample" sub="Illustrated" />
                <MetricCard label="Repair Potential" value="Sample" sub="Illustrated" />
                <MetricCard label="Clarity" value="Sample" sub="Illustrated" />
              </div>

              <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.04] p-4">
                <div className="text-sm font-medium text-white/85">
                  Current Story Insight
                </div>
                <p className="mt-2 text-sm leading-7 text-white/65">
                  Sample narrative: strong engagement can sit next to volatility.
                  The product is for organizing your own notes — it does not score
                  a real couple or claim a measured outcome.
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
                    Sample coaching copy for the preview only. Keep messages simple
                    and non-pressuring while you decide what evidence you still need.
                  </p>

                  <div className="mt-5 text-sm font-medium text-white/85">
                    Most Likely Story Path
                  </div>
                  <div className="motion-card motion-hover-lift mt-2 rounded-2xl border border-amber-300/15 bg-amber-300/10 px-3 py-2 text-sm text-amber-100">
                    Loop Path — illustrated, not a prediction
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-fuchsia-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl" />
        </div>
      </section>

      <section id="product" className="mx-auto max-w-7xl px-6 py-16 lg:py-20" data-reveal>
        <div className="mb-12 max-w-3xl">
          <div className="text-sm uppercase tracking-[0.2em] text-white/40">
            Product
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
            A private relationship workspace—not a dating app
          </h2>
          <p className="mt-4 text-lg leading-8 text-white/65">
            For complicated romance, mixed signals, reconciliation questions, and
            emotional pattern fog—LuvStories is a calm, premium surface for your
            own narrative, metrics, and next moves.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {featureCards.map((card) => (
            <div
              key={card.title}
              className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-7 transition hover:border-white/20"
            >
              <div
                className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${card.accent} opacity-60 blur-2xl transition group-hover:opacity-90`}
              />
              <div className="relative text-xl font-semibold">{card.title}</div>
              <p className="relative mt-3 text-sm leading-7 text-white/65">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="privacy" className="mx-auto max-w-7xl px-6 py-16 lg:py-24" data-reveal>
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <div className="text-sm uppercase tracking-[0.2em] text-white/40">
              Privacy
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
              Your relationship story stays yours
            </h2>
            <p className="mt-4 text-lg leading-8 text-white/65">
              No public profiles. No exposed timelines. The product is built so
              private narratives, notes, and reports are scoped to the signed-in
              owner—with database policies designed for strict separation.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <PrivacyCard
              title="Account-scoped stories"
              body="Every query is tied to your user id. There are no public story URLs for private content."
            />
            <PrivacyCard
              title="Encryption-ready notes"
              body="Sensitive text can be stored encrypted; keys and cleartext stay under your control."
            />
            <PrivacyCard
              title="No surveillance positioning"
              body="LuvStories is for personal clarity and reflection—not tracking another person without consent."
            />
            <PrivacyCard
              title="You own exports"
              body="When export ships, your data should leave as easily as it entered—on your terms."
            />
          </div>
        </div>
      </section>

      <section id="future" className="mx-auto max-w-7xl px-6 pb-24" data-reveal>
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-8 shadow-xl shadow-black/40 backdrop-blur-md md:p-12">
          <div className="max-w-3xl">
            <div className="text-sm uppercase tracking-[0.2em] text-white/40">
              Future
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
              Deeper timelines. Richer reports. Still private.
            </h2>
            <p className="mt-4 text-base leading-8 text-white/65 md:text-lg">
              The roadmap points toward richer event modeling, coaching around
              difficult messages, scenario paths, and careful, opt-in assistance
              —without turning your love life into public content.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                "Event graph & chapters",
                "Private PDF exports",
                "Scenario modeling",
                "Pattern alerts you control",
                "Optional AI reports (privacy-reviewed)",
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

      <ProcessFlowSection />
      <ProductHonestyNote status="demo" />
    </div>
  );
}

function PrivacyCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
      <div className="text-lg font-semibold">{title}</div>
      <p className="mt-2 text-sm leading-7 text-white/65">{body}</p>
    </div>
  );
}
