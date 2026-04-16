interface MetricCardProps {
  label: string;
  value: string;
  sub: string;
  className?: string;
}

export function MetricCard({ label, value, sub, className = '' }: MetricCardProps) {
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
