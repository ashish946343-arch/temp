// Mock service layer. This is the seam where a real FastAPI endpoint
// (Person 2 — Change Detection, "/change") will be dropped in later.

import { changeData, changeDataByScene } from "../mock/changeData";

export async function analyzeChange(sceneId) {
  await new Promise((resolve) => setTimeout(resolve, 700));
  return changeDataByScene[sceneId] || changeData;
}
