import { MapPin, Calendar, Radio, Maximize2 } from "lucide-react";

function sceneLabel(imageId) {
  const num = imageId.split("_")[1];
  return `Scene ${num}`;
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function scoreColor(score) {
  if (score >= 0.9) return "text-status-high";
  if (score >= 0.8) return "text-status-med";
  return "text-status-low";
}

export default function ResultCard({ result, selected, onSelect, onAnalyze }) {
  return (
    <div
      onClick={() => onSelect(result)}
      className={`cursor-pointer border p-3 transition-colors ${
        selected
          ? "border-amber-dim bg-amber/5"
          : "border-hairline bg-surface hover:border-hairline-strong"
      }`}
    >
      <div className="flex gap-3">
        <img
          src={result.thumbnail}
          alt={sceneLabel(result.image_id)}
          className="h-16 w-16 flex-shrink-0 border border-hairline object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[10px] font-mono tracking-wide text-ink-faint">
                SATELLITE SCENE
              </p>
              <h3 className="text-[13px] font-medium text-ink">
                {sceneLabel(result.image_id)}
              </h3>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-ink-faint">Similarity</p>
              <p className={`font-mono text-[14px] font-semibold ${scoreColor(result.score)}`}>
                {Math.round(result.score * 100)}%
              </p>
            </div>
          </div>
          <p className="mt-1 truncate text-[11px] text-ink-dim">{result.title}</p>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-y-1.5 border-t border-hairline pt-2.5 text-[11px]">
        <div className="flex items-center gap-1.5 text-ink-dim">
          <MapPin size={11} strokeWidth={1.75} />
          <span className="font-mono">
            {result.location.lat.toFixed(4)}, {result.location.lng.toFixed(4)}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-ink-dim">
          <Calendar size={11} strokeWidth={1.75} />
          <span className="font-mono">{formatDate(result.date)}</span>
        </div>
        <div className="flex items-center gap-1.5 text-ink-dim">
          <Radio size={11} strokeWidth={1.75} />
          <span>{result.sensor}</span>
        </div>
        <div className="flex items-center gap-1.5 text-ink-dim">
          <Maximize2 size={11} strokeWidth={1.75} />
          <span>{result.resolution}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onAnalyze(result);
        }}
        className="mt-3 w-full border border-hairline-strong py-1.5 text-[11px] font-medium tracking-wide text-ink transition-colors hover:border-amber-dim hover:text-amber"
      >
        ANALYZE
      </button>
    </div>
  );
}
