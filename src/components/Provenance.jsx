import { Check } from "lucide-react";

const STEPS = [
  "Sentinel-2 Data",
  "Preprocessing",
  "Semantic Retrieval",
  "Relevant Location",
  "Temporal Comparison",
  "Change Detection",
  "Confidence Estimation",
  "Evidence Generated",
];

export default function Provenance() {
  return (
    <div className="border border-hairline bg-surface">
      <div className="border-b border-hairline px-3 py-2.5">
        <h2 className="text-[11px] font-medium tracking-wide text-ink-dim uppercase">
          Processing / Provenance
        </h2>
      </div>
      <div className="p-3">
        {STEPS.map((step, i) => (
          <div key={step} className="flex items-start gap-2.5">
            <div className="flex flex-col items-center">
              <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border border-status-high/50 bg-status-high/10 text-status-high">
                <Check size={10} strokeWidth={2.5} />
              </span>
              {i < STEPS.length - 1 && <span className="h-4 w-px bg-hairline-strong" />}
            </div>
            <p className="pb-2 text-[12px] text-ink-dim">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
