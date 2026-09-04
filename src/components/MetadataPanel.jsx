function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function MetadataPanel({ metadata, acquisitionDate, coordinates }) {
  const rows = [
    ["Image ID", metadata.image_id],
    ["Acquisition Date", formatDate(acquisitionDate)],
    ["Sensor", metadata.sensor],
    ["Coordinates", `${coordinates.lat.toFixed(4)}, ${coordinates.lng.toFixed(4)}`],
    ["CRS", metadata.crs],
    ["Resolution", metadata.resolution],
    ["Source", metadata.source],
  ];

  return (
    <div className="border border-hairline bg-surface">
      <div className="border-b border-hairline px-3 py-2.5">
        <h2 className="text-[11px] font-medium tracking-wide text-ink-dim uppercase">
          Image Information
        </h2>
      </div>
      <dl className="divide-y divide-hairline">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between px-3 py-2">
            <dt className="text-[11px] text-ink-faint">{label}</dt>
            <dd className="font-mono text-[11px] text-ink">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
