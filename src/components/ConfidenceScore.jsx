// Tailwind's scanner needs full class strings present in source, so tiers
// are looked up rather than built with template-literal interpolation.
const TIERS = {
  high: {
    label: "HIGH CONFIDENCE",
    bar: "bg-status-high",
    text: "text-status-high",
  },
  medium: {
    label: "MEDIUM CONFIDENCE",
    bar: "bg-status-med",
    text: "text-status-med",
  },
  low: {
    label: "LOW CONFIDENCE",
    bar: "bg-status-low",
    text: "text-status-low",
  },
};

function confidenceTier(pct) {
  if (pct >= 85) return TIERS.high;
  if (pct >= 60) return TIERS.medium;
  return TIERS.low;
}

export default function ConfidenceScore({ confidence }) {
  const pct = Math.round(confidence * 100);
  const tier = confidenceTier(pct);

  return (
    <div className="border border-hairline bg-surface p-3.5">
      <p className="text-[11px] font-medium tracking-wide text-ink-dim uppercase">
        Confidence
      </p>
      <p className="mt-1 font-mono text-[32px] font-semibold leading-none text-ink">
        {pct}%
      </p>
      <div className="mt-3 h-1.5 w-full overflow-hidden bg-void">
        <div
          className={`h-full ${tier.bar} transition-all duration-500`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className={`mt-2 text-[11px] font-medium tracking-wide ${tier.text}`}>
        {tier.label}
      </p>
    </div>
  );
}
