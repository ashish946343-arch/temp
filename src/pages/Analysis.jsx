import { useEffect, useState } from "react";
import { ArrowLeft, Loader2, TriangleAlert } from "lucide-react";
import BeforeAfter from "../components/BeforeAfter";
import ChangeMask from "../components/ChangeMask";
import ConfidenceScore from "../components/ConfidenceScore";
import MetadataPanel from "../components/MetadataPanel";
import Provenance from "../components/Provenance";
import Workflow from "../components/Workflow";
import { analyzeChange } from "../services/changeApi";

export default function Analysis({ scene, onBack }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);
    setData(null);

    analyzeChange(scene?.image_id)
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [scene]);

  const sceneLabel = scene ? `Scene ${scene.image_id.split("_")[1]}` : "";

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-3 p-4">
      <button
        type="button"
        onClick={onBack}
        className="flex w-fit items-center gap-1.5 text-[11px] font-medium tracking-wide text-ink-dim transition-colors hover:text-amber"
      >
        <ArrowLeft size={13} strokeWidth={1.75} />
        BACK TO SEARCH
      </button>

      <div>
        <p className="text-[10px] font-medium tracking-wide text-ink-faint uppercase">
          Temporal Change Analysis
        </p>
        <h1 className="text-[18px] font-semibold text-ink">{sceneLabel}</h1>
      </div>

      <Workflow activeIndex={loading ? 5 : 6} />

      {loading && (
        <div className="flex flex-col items-center justify-center gap-2 border border-hairline bg-surface py-24 text-ink-dim">
          <Loader2 size={20} className="animate-spin text-amber" strokeWidth={1.75} />
          <p className="text-[11px] tracking-wide">ANALYZING TEMPORAL CHANGE...</p>
        </div>
      )}

      {!loading && error && (
        <div className="flex flex-col items-center justify-center gap-2 border border-status-low/40 bg-status-low/5 py-24 text-center">
          <TriangleAlert size={20} strokeWidth={1.75} className="text-status-low" />
          <p className="text-[12px] text-ink">Analysis could not be completed.</p>
          <p className="text-[11px] text-ink-faint">Please try again.</p>
        </div>
      )}

      {!loading && !error && data && (
        <>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_320px]">
            <div className="flex flex-col gap-3">
              <BeforeAfter before={data.before} after={data.after} />

              <div className="border border-hairline bg-surface p-4">
                <p className="text-[10px] font-medium tracking-wide text-ink-faint uppercase">
                  Change Detected
                </p>
                <p className="mt-1 text-[20px] font-semibold text-ink">{data.change_type}</p>
                <div className="mt-3 grid grid-cols-3 gap-4 border-t border-hairline pt-3">
                  <div>
                    <p className="text-[10px] text-ink-faint">Confidence</p>
                    <p className="font-mono text-[13px] text-ink">
                      {Math.round(data.confidence * 100)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-ink-faint">Change Area</p>
                    <p className="font-mono text-[13px] text-ink">{data.change_area}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-ink-faint">Location</p>
                    <p className="font-mono text-[13px] text-ink">
                      {data.location.lat.toFixed(4)}, {data.location.lng.toFixed(4)}
                    </p>
                  </div>
                </div>
              </div>

              <ChangeMask maskImage={data.change_mask} changeType={data.change_type} />
            </div>

            <div className="flex flex-col gap-3">
              <ConfidenceScore confidence={data.confidence} />
              <MetadataPanel
                metadata={data.metadata}
                acquisitionDate={data.after.date}
                coordinates={data.location}
              />
              <Provenance />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
