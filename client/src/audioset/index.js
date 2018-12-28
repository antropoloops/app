import { memo, cachedFetch } from "./cache";
import { getResourceUrls } from "./resources";

const BASE_URL = (process.env.PUBLIC_URL || "") + "/audiosets";
const json = response => response.json();

export function getClipCoverImageUrl(audioset, clipId) {
  const coverUrls = memo(audioset, "coverUrls", () =>
    getResourceUrls(audioset, "covers")
  );
  return coverUrls[clipId];
}

export function fetchIndex(baseUrl = BASE_URL) {
  const url = `${baseUrl}/audioset.index.json`;
  return cachedFetch(url, json);
}

export function fetchAudioset(audiosetId, baseUrl = BASE_URL) {
  const url = `${baseUrl}/${audiosetId}.audioset.json`;
  return cachedFetch(url, json);
}
