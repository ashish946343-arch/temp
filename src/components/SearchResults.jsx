import { SearchX, Loader2 } from "lucide-react";
import ResultCard from "./ResultCard";

export default function SearchResults({
  results,
  loading,
  hasSearched,
  selectedId,
  onSelect,
  onAnalyze,
}) {
  return (
    <div className="flex h-full flex-col border border-hairline bg-surface">
      <div className="flex items-center justify-between border-b border-hairline px-3 py-2.5">
        <h2 className="text-[11px] font-medium tracking-wide text-ink-dim uppercase">
          Search Results
        </h2>
        {hasSearched && !loading && (
          <span className="font-mono text-[10px] text-ink-faint">
            {results.length} found
          </span>
        )}
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto p-3">
        {loading && (
          <div className="flex flex-col items-center justify-center gap-2 py-16 text-ink-dim">
            <Loader2 size={18} className="animate-spin text-amber" strokeWidth={1.75} />
            <p className="text-[11px] tracking-wide">SEARCHING SATELLITE ARCHIVE...</p>
          </div>
        )}

        {!loading && hasSearched && results.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-2 py-16 text-center text-ink-dim">
            <SearchX size={20} strokeWidth={1.5} className="text-ink-faint" />
            <p className="text-[12px]">No relevant satellite scenes found.</p>
            <p className="text-[11px] text-ink-faint">
              Try changing your query or filters.
            </p>
          </div>
        )}

        {!loading && !hasSearched && (
          <div className="flex flex-col items-center justify-center gap-2 py-16 text-center text-ink-faint">
            <p className="text-[11px]">Run a search to see relevant scenes here.</p>
          </div>
        )}

        {!loading &&
          results.map((result) => (
            <ResultCard
              key={result.image_id}
              result={result}
              selected={result.image_id === selectedId}
              onSelect={onSelect}
              onAnalyze={onAnalyze}
            />
          ))}
      </div>
    </div>
  );
}
