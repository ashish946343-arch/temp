// Mock service layer. This is the seam where a real FastAPI endpoint
// (Person 1 — Semantic Retrieval, "/query") will be dropped in later.
// The rest of the app only depends on this function's return shape,
// so swapping the implementation should not require UI changes.

import { searchResults, similarLocationsResults } from "../mock/searchData";
import { routeQuery } from "../router/queryRouter";

export async function searchSatelliteImages(query) {
  await new Promise((resolve) => setTimeout(resolve, 700));

  const intent = routeQuery(query);

  if (intent === "IMAGE_SEARCH") {
    return { intent, results: similarLocationsResults };
  }

  // Empty-result demo path: typing "nothing" / "no results" shows the
  // empty state without needing a real query language.
  const q = (query || "").toLowerCase();
  if (q.includes("no result") || q.includes("nothing")) {
    return { intent, results: [] };
  }

  return { intent, results: searchResults };
}

export async function searchByImage(_fileName) {
  await new Promise((resolve) => setTimeout(resolve, 700));
  return { intent: "IMAGE_SEARCH", results: similarLocationsResults };
}
