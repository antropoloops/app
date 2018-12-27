import { memo, cachedFetch } from "./cache";
import { getResourceUrls } from "./resources";

const BASE_URL = process.env.PUBLIC_URL + "/audiosets";
const json = response => response.json();

export function getClipCoverImageUrl(audioset, clipId) {
  const key = `audioset://${audioset.id}/coverUrls`;
  const coverUrls = memo(key, () => getResourceUrls(audioset, "covers"));
  return coverUrls[clipId];
}

export function fetchIndex(baseUrl = BASE_URL) {
  const url = `${baseUrl}/audioset.index.json`;
  return cachedFetch(url, json);
}

export function loadAudioset(audiosetId, baseUrl = BASE_URL) {
  const url = `${baseUrl}/${audiosetId}.audioset.json`;
  return cachedFetch(url, json);
}
