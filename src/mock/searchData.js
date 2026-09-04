// Local demo data only. Coordinates, scores and dates are simulated
// for prototype purposes and do not represent real intelligence findings.

export const searchResults = [
  {
    image_id: "scene_001",
    score: 0.94,
    location: {
      lat: 30.7046,
      lng: 76.7179,
    },
    date: "2026-05-10",
    sensor: "Sentinel-2",
    resolution: "10 m",
    title: "Possible new structure near water",
    thumbnail: "/images/scene_001.jpg",
  },
  {
    image_id: "scene_002",
    score: 0.89,
    location: {
      lat: 30.71,
      lng: 76.72,
    },
    date: "2026-04-18",
    sensor: "Sentinel-2",
    resolution: "10 m",
    title: "Possible construction area",
    thumbnail: "/images/scene_002.jpg",
  },
  {
    image_id: "scene_003",
    score: 0.84,
    location: {
      lat: 30.699,
      lng: 76.725,
    },
    date: "2026-03-22",
    sensor: "Sentinel-2",
    resolution: "10 m",
    title: "Changed terrain",
    thumbnail: "/images/scene_003.jpg",
  },
];

// Alternate result sets so different demo queries feel distinct.
export const similarLocationsResults = [
  {
    image_id: "scene_004",
    score: 0.91,
    location: { lat: 30.718, lng: 76.708 },
    date: "2026-05-02",
    sensor: "Sentinel-2",
    resolution: "10 m",
    title: "Visually similar riverbank structure",
    thumbnail: "/images/scene_002.jpg",
  },
  {
    image_id: "scene_005",
    score: 0.87,
    location: { lat: 30.695, lng: 76.731 },
    date: "2026-04-27",
    sensor: "Sentinel-2",
    resolution: "10 m",
    title: "Similar built-up footprint",
    thumbnail: "/images/scene_003.jpg",
  },
  {
    image_id: "scene_006",
    score: 0.79,
    location: { lat: 30.712, lng: 76.715 },
    date: "2026-03-14",
    sensor: "Sentinel-2",
    resolution: "10 m",
    title: "Comparable structure cluster",
    thumbnail: "/images/scene_001.jpg",
  },
];
