import { SatelliteDish } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b border-hairline bg-surface/80 backdrop-blur-sm sticky top-0 z-30">
      <div className="flex items-center justify-between px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center border border-hairline-strong bg-void text-amber">
            <SatelliteDish size={18} strokeWidth={1.75} />
          </div>
          <div className="leading-tight">
            <h1 className="text-[13px] font-semibold tracking-wide text-ink">
              SATELLITE INTELLIGENCE PLATFORM
            </h1>
            <p className="text-[11px] text-ink-dim">
              Semantic Retrieval &amp; Multi-Temporal Change Analysis
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end leading-tight">
            <span className="text-[11px] font-medium text-ink-dim">
              Prototype for SIH 2026
            </span>
            <span className="text-[10px] text-ink-faint">
              Demonstration data only
            </span>
          </div>
          <div className="flex flex-col items-end gap-1 border border-hairline px-2.5 py-1.5">
            <span className="flex items-center gap-1.5 text-[11px] font-medium text-status-high">
              <span className="h-1.5 w-1.5 rounded-full bg-status-high pulse-dot" />
              LOCAL DEMO
            </span>
            <span className="text-[10px] font-mono tracking-wide text-ink-faint">
              MOCK DATA
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
