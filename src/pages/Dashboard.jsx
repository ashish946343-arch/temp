import { useRef, useState } from "react";
import { Upload, X, ImageIcon } from "lucide-react";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import MapView from "../components/MapView";
import Workflow from "../components/Workflow";
import { searchSatelliteImages, searchByImage } from "../services/searchApi";

const DATE_OPTIONS = ["Any Date", "Last 30 Days", "Last 90 Days"];
const SENSOR_OPTIONS = ["Sentinel-2"];
const AOI_OPTIONS = ["All", "Zone A", "Zone B"];

function withinWindow(dateStr, days) {
  const date = new Date(dateStr);
  const now = new Date("2026-05-15"); // fixed reference so the demo is deterministic
  const diff = (now - date) / (1000 * 60 * 60 * 24);
  return diff <= days;
}

export default function Dashboard({ onAnalyze }) {
  const [query, setQuery] = useState("Find newly built structures near water");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState(false);

  const [dateFilter, setDateFilter] = useState(DATE_OPTIONS[0]);
  const [sensorFilter, setSensorFilter] = useState(SENSOR_OPTIONS[0]);
  const [aoiFilter, setAoiFilter] = useState(AOI_OPTIONS[0]);

  const [imagePreview, setImagePreview] = useState(null);
  const [imageResults, setImageResults] = useState(null);
  const fileInputRef = useRef(null);

  async function runSearch(q) {
    setQuery(q);
    setLoading(true);
    setError(false);
    setHasSearched(true);
    setSelected(null);
    setImageResults(null);
    try {
      const { results: found } = await searchSatelliteImages(q);
      setResults(found);
    } catch {
      setError(true);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  function handleImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImagePreview(URL.createObjectURL(file));
    setImageResults(null);
  }

  async function findSimilar() {
    setLoading(true);
    setHasSearched(true);
    try {
      const { results: found } = await searchByImage(imagePreview);
      setResults(found);
      setImageResults(found);
      setSelected(null);
    } finally {
      setLoading(false);
    }
  }

  function clearImage() {
    setImagePreview(null);
    setImageResults(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  const filteredResults = results.filter((r) => {
    if (dateFilter === "Last 30 Days" && !withinWindow(r.date, 30)) return false;
    if (dateFilter === "Last 90 Days" && !withinWindow(r.date, 90)) return false;
    if (sensorFilter !== "Sentinel-2" && r.sensor !== sensorFilter) return false;
    if (aoiFilter !== "All") {
      // Cosmetic AOI partition for the demo: alternate scenes by parity.
      const idx = parseInt(r.image_id.split("_")[1], 10);
      const zone = idx % 2 === 0 ? "Zone A" : "Zone B";
      if (zone !== aoiFilter) return false;
    }
    return true;
  });

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-3 p-4">
      <Workflow activeIndex={hasSearched ? (selected ? 3 : 2) : 0} />

      <SearchBar
        query={query}
        onQueryChange={setQuery}
        onSearch={runSearch}
        loading={loading}
      />

      <div className="flex flex-wrap items-end gap-4 border border-hairline bg-surface px-4 py-3">
        <FilterSelect label="Date" value={dateFilter} options={DATE_OPTIONS} onChange={setDateFilter} />
        <FilterSelect label="Sensor" value={sensorFilter} options={SENSOR_OPTIONS} onChange={setSensorFilter} />
        <FilterSelect label="AOI" value={aoiFilter} options={AOI_OPTIONS} onChange={setAoiFilter} />

        <div className="ml-auto flex items-center gap-3">
          {imagePreview ? (
            <div className="flex items-center gap-2">
              <img
                src={imagePreview}
                alt="Query upload"
                className="h-9 w-9 border border-hairline object-cover"
              />
              <button
                type="button"
                onClick={findSimilar}
                className="border border-amber-dim bg-amber/10 px-3 py-1.5 text-[11px] font-medium text-amber hover:bg-amber/20"
              >
                FIND SIMILAR
              </button>
              <button
                type="button"
                onClick={clearImage}
                className="border border-hairline p-1.5 text-ink-dim hover:text-ink"
                aria-label="Remove uploaded image"
              >
                <X size={13} strokeWidth={1.75} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 border border-hairline px-3 py-1.5 text-[11px] text-ink-dim transition-colors hover:border-hairline-strong hover:text-ink"
            >
              <Upload size={13} strokeWidth={1.75} />
              Upload Satellite Image
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
      </div>

      {imageResults && (
        <div className="flex items-center gap-2 border border-cyan-dim/40 bg-cyan/5 px-3 py-2 text-[11px] text-cyan">
          <ImageIcon size={13} strokeWidth={1.75} />
          Showing locations visually similar to the uploaded image (mock embeddings).
        </div>
      )}

      <div className="grid min-h-[520px] grid-cols-1 gap-3 lg:grid-cols-[380px_1fr]">
        <SearchResults
          results={filteredResults}
          loading={loading}
          hasSearched={hasSearched}
          selectedId={selected?.image_id}
          onSelect={setSelected}
          onAnalyze={onAnalyze}
        />
        <MapView results={filteredResults} selected={selected} onSelect={setSelected} />
      </div>
    </div>
  );
}

function FilterSelect({ label, value, options, onChange }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[10px] tracking-wide text-ink-faint">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-hairline bg-void px-2.5 py-1.5 text-[11px] text-ink outline-none focus:border-amber-dim"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}
