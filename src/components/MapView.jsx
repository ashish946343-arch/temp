import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

function markerIcon(active) {
  const color = active ? "#e5a94b" : "#5fa8d3";
  const size = active ? 16 : 12;
  return L.divIcon({
    className: "",
    html: `<span style="
      display:block;
      width:${size}px;
      height:${size}px;
      border-radius:50%;
      background:${color};
      box-shadow:0 0 0 4px ${color}33, 0 0 0 1px #0a0d12;
    "></span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function FlyToSelected({ selected }) {
  const map = useMap();
  useEffect(() => {
    if (selected) {
      map.flyTo([selected.location.lat, selected.location.lng], 14, {
        duration: 0.8,
      });
    }
  }, [selected, map]);
  return null;
}

export default function MapView({ results, selected, onSelect }) {
  const center = selected
    ? [selected.location.lat, selected.location.lng]
    : results[0]
      ? [results[0].location.lat, results[0].location.lng]
      : [30.7046, 76.7179];

  return (
    <div className="relative h-full w-full border border-hairline bg-surface">
      <div className="absolute left-3 top-3 z-[400] border border-hairline bg-void/85 px-2.5 py-1.5 backdrop-blur-sm">
        <p className="text-[10px] font-mono tracking-wide text-ink-dim">
          {results.length} SCENE{results.length === 1 ? "" : "S"} PLOTTED
        </p>
      </div>
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <FlyToSelected selected={selected} />
        {results.map((result) => (
          <Marker
            key={result.image_id}
            position={[result.location.lat, result.location.lng]}
            icon={markerIcon(selected?.image_id === result.image_id)}
            eventHandlers={{
              click: () => onSelect(result),
            }}
          >
            <Popup>
              <div className="space-y-0.5">
                <div className="font-semibold text-[11px]">
                  Scene {result.image_id.split("_")[1]}
                </div>
                <div>
                  {result.location.lat.toFixed(4)}, {result.location.lng.toFixed(4)}
                </div>
                <div>{result.date}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
