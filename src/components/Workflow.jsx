const STAGES = [
  "DATA",
  "PREPROCESS",
  "RETRIEVE",
  "DISCOVER",
  "COMPARE",
  "DETECT",
  "EXPLAIN",
];

export default function Workflow({ activeIndex = 0 }) {
  return (
    <div className="border border-hairline bg-surface px-3 py-2.5">
      <p className="mb-2 text-[10px] font-medium tracking-wide text-ink-faint uppercase">
        System Workflow
      </p>
      <div className="flex items-center overflow-x-auto">
        {STAGES.map((stage, i) => {
          const isActive = i === activeIndex;
          const isDone = i < activeIndex;
          return (
            <div key={stage} className="flex items-center">
              <div
                className={`flex items-center gap-1.5 whitespace-nowrap border px-2.5 py-1 text-[10px] font-mono tracking-wide transition-colors ${
                  isActive
                    ? "border-amber-dim bg-amber/10 text-amber"
                    : isDone
                      ? "border-hairline-strong text-ink-dim"
                      : "border-hairline text-ink-faint"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    isActive
                      ? "bg-amber pulse-dot"
                      : isDone
                        ? "bg-status-high"
                        : "bg-ink-faint"
                  }`}
                />
                {stage}
              </div>
              {i < STAGES.length - 1 && (
                <div
                  className={`h-px w-4 flex-shrink-0 ${
                    isDone ? "bg-hairline-strong" : "bg-hairline"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
