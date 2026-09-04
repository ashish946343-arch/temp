import { Search } from "lucide-react";

const QUICK_QUERIES = [
  "New structures near water",
  "Find similar locations",
  "What changed here?",
];

export default function SearchBar({ query, onQueryChange, onSearch, loading }) {
  function handleSubmit(e) {
    e.preventDefault();
    onSearch(query);
  }

  return (
    <div className="border border-hairline bg-surface p-4">
      <h2 className="text-[11px] font-medium tracking-wide text-ink-dim uppercase">
        Search Satellite Imagery
      </h2>

      <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
        <div className="relative flex-1">
          <Search
            size={15}
            strokeWidth={1.75}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Find newly built structures near water"
            className="w-full border border-hairline bg-void py-2.5 pl-9 pr-3 text-[13px] text-ink placeholder:text-ink-faint outline-none focus:border-amber-dim"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="border border-amber-dim bg-amber/10 px-5 text-[12px] font-medium tracking-wide text-amber transition-colors hover:bg-amber/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? "SEARCHING…" : "SEARCH"}
        </button>
      </form>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-[11px] text-ink-faint">Quick Queries:</span>
        {QUICK_QUERIES.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => onSearch(q)}
            className="border border-hairline px-2.5 py-1 text-[11px] text-ink-dim transition-colors hover:border-hairline-strong hover:text-ink"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
