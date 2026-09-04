// Local demo data only. This mock response stands in for the future
// Person 2 (Change Detection) API response shape.

export const changeData = {
  change_type: "Construction",
  confidence: 0.91,
  change_area: "1,240 m²",

  location: {
    lat: 30.7046,
    lng: 76.7179,
  },

  before: {
    date: "2024-06-12",
    image: "/images/before.jpg",
  },

  after: {
    date: "2026-05-10",
    image: "/images/after.jpg",
  },

  change_mask: "/images/change-mask.jpg",

  metadata: {
    image_id: "scene_001",
    sensor: "Sentinel-2",
    resolution: "10 m",
    crs: "EPSG:4326",
    source: "Local Satellite Archive",
  },
};

// Keyed by image_id so any result card can open a plausible, distinct
// analysis without needing a real backend.
export const changeDataByScene = {
  scene_001: changeData,
  scene_002: {
    change_type: "Construction",
    confidence: 0.86,
    change_area: "860 m²",
    location: { lat: 30.71, lng: 76.72 },
    before: { date: "2024-09-03", image: "/images/before.jpg" },
    after: { date: "2026-04-18", image: "/images/after.jpg" },
    change_mask: "/images/change-mask.jpg",
    metadata: {
      image_id: "scene_002",
      sensor: "Sentinel-2",
      resolution: "10 m",
      crs: "EPSG:4326",
      source: "Local Satellite Archive",
    },
  },
  scene_003: {
    change_type: "Land Clearing",
    confidence: 0.73,
    change_area: "2,105 m²",
    location: { lat: 30.699, lng: 76.725 },
    before: { date: "2024-02-27", image: "/images/before.jpg" },
    after: { date: "2026-03-22", image: "/images/after.jpg" },
    change_mask: "/images/change-mask.jpg",
    metadata: {
      image_id: "scene_003",
      sensor: "Sentinel-2",
      resolution: "10 m",
      crs: "EPSG:4326",
      source: "Local Satellite Archive",
    },
  },
};
