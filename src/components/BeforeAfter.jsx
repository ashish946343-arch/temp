import { useState } from "react";
import { Columns2, SquareSplitHorizontal } from "lucide-react";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function BeforeAfter({ before, after }) {
  const [mode, setMode] = useState("side"); // "side" | "slider"
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div className="border border-hairline bg-surface">
      <div className="flex items-center justify-between border-b border-hairline px-3 py-2.5">
        <h2 className="text-[11px] font-medium tracking-wide text-ink-dim uppercase">
          Temporal Comparison
        </h2>
        <div className="flex border border-hairline">
          <button
            type="button"
            onClick={() => setMode("side")}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-[10px] tracking-wide transition-colors ${
              mode === "side" ? "bg-amber/10 text-amber" : "text-ink-dim hover:text-ink"
            }`}
          >
            <Columns2 size={12} strokeWidth={1.75} />
            SIDE BY SIDE
          </button>
          <button
            type="button"
            onClick={() => setMode("slider")}
            className={`flex items-center gap-1.5 border-l border-hairline px-2.5 py-1 text-[10px] tracking-wide transition-colors ${
              mode === "slider" ? "bg-amber/10 text-amber" : "text-ink-dim hover:text-ink"
            }`}
          >
            <SquareSplitHorizontal size={12} strokeWidth={1.75} />
            SLIDER
          </button>
        </div>
      </div>

      {mode === "side" ? (
        <div className="grid grid-cols-2 gap-px bg-hairline">
          <div className="bg-surface">
            <div className="flex items-center justify-between px-3 py-1.5">
              <span className="text-[10px] font-medium tracking-wide text-ink-dim">BEFORE</span>
              <span className="font-mono text-[10px] text-ink-faint">{formatDate(before.date)}</span>
            </div>
            <img src={before.image} alt="Before" className="aspect-[4/3] w-full object-cover" />
          </div>
          <div className="bg-surface">
            <div className="flex items-center justify-between px-3 py-1.5">
              <span className="text-[10px] font-medium tracking-wide text-ink-dim">AFTER</span>
              <span className="font-mono text-[10px] text-ink-faint">{formatDate(after.date)}</span>
            </div>
            <img src={after.image} alt="After" className="aspect-[4/3] w-full object-cover" />
          </div>
        </div>
      ) : (
        <div className="p-3">
          <div className="relative aspect-[16/9] w-full select-none overflow-hidden border border-hairline">
            <img
              src={after.image}
              alt="After"
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
            />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src={before.image}
                alt="Before"
                className="h-full w-full object-cover"
                style={{ width: `${10000 / Math.max(sliderPos, 1)}%`, maxWidth: "none" }}
                draggable={false}
              />
            </div>
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-amber"
              style={{ left: `${sliderPos}%` }}
            />
            <span className="absolute left-2 top-2 border border-hairline-strong bg-void/80 px-2 py-0.5 text-[10px] font-medium tracking-wide text-ink-dim">
              BEFORE
            </span>
            <span className="absolute right-2 top-2 border border-hairline-strong bg-void/80 px-2 py-0.5 text-[10px] font-medium tracking-wide text-ink-dim">
              AFTER
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={sliderPos}
            onChange={(e) => setSliderPos(Number(e.target.value))}
            className="mt-2 w-full accent-amber"
          />
        </div>
      )}
    </div>
  );
}
