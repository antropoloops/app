import { cachedFetch, memo } from "./cache";
import context from "audio-context";

const ENV = process.env.NODE_ENV;

function getSources(audioset) {
  const resources = audioset.resources || {};
  return Object.assign({}, resources.default, resources[ENV]);
}
const url = source => name => source && source.replace("{{filename}}", name);
const resourceUrl = (audioset, type) => url(getSources(audioset)[type] || "");

export default { getCachedResources, loadResources, getResourceUrls };

export function getResourceUrls(audioset, type) {
  const names = Object.keys(audioset.clips);
  const toUrl = resourceUrl(audioset, type);
  return names.reduce((urls, name) => {
    urls[name] = toUrl(name);
    return urls;
  }, {});
}

const identity = x => x;
const DECODERS = {
  audio: decodeAudio
};

export function loadResources(audioset, type, clipIds) {
  clipIds = clipIds || Object.keys(audioset.clips);
  const toUrl = resourceUrl(audioset, type);
  const decoder = DECODERS[type] || identity;
  return clipIds.map(clipId => cachedFetch(toUrl(clipId), decoder));
}

export function getCachedResources(audioset, type) {
  return memo(audioset, type, () => {
    const cached = {};
    const clipIds = Object.keys(audioset.clips);
    Promise.all(
      loadResources(audioset, type, clipIds).map((promise, i) =>
        promise.then(resource => {
          cached[clipIds[i]] = resource;
          return resource;
        })
      )
    );
    return cached;
  });
}

function decodeAudio(response) {
  const ctx = context();
  return response.arrayBuffer().then(buffer => ctx.decodeAudioData(buffer));
}
