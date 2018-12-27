import loadImage from "image-promise";
import context from "audio-context";

const ENV = process.env.NODE_ENV;
const RESOURCES = {};

const url = source => name => source && source.replace("{{filename}}", name);

export default { getCachedResources, loadResources, getResourceUrls };

export function getResourceUrls(audioset, type) {
  const names = Object.keys(audioset.clips);
  const source = getSources(audioset)[type];
  const toUrl = url(source);
  return names.reduce((urls, name) => {
    urls[name] = toUrl(name);
    return urls;
  }, {});
}

export function loadResources(audioset, type) {
  const cached = RESOURCES[audioset.id];
  if (cached) return Promise.resolve(cached);

  return Promise.all(fetchAndCacheResources(audioset, type)).then(
    () => RESOURCES[audioset.id]
  );
}

export function getCachedResources(audioset, type) {
  const cached = RESOURCES[audioset.id];
  if (cached) return cached;

  fetchAndCacheResources(audioset, type);
  return RESOURCES[audioset.id];
}

function fetchAndCacheResources(audioset, type) {
  const cache = (RESOURCES[audioset.id] = {});
  const names = Object.keys(audioset.clips);
  return fillCache(cache, names, fetchResources(audioset, names, type));
}

function fillCache(cache, names, promises) {
  return promises.map((p, i) =>
    p.then(data => {
      cache[names[i]] = data;
    })
  );
}

const DECODERS = {
  audio: loadAudio,
  covers: loadImage
};

/**
 * @return {Array<Promises>}
 */
export function fetchResources(audioset, names, type) {
  console.log("FETCH", type);
  const source = getSources(audioset)[type];
  if (!source) return [];
  const fetchAndDecode = DECODERS[type] || fetch;
  console.log("decoder", type, fetchAndDecode);

  const toUrl = url(source);
  return names.map(toUrl).map(fetchAndDecode);
}

function getSources(audioset) {
  const resources = audioset.resources || {};
  return Object.assign({}, resources.default, resources[ENV]);
}

function loadAudio(url) {
  const ctx = context();
  return fetch(url)
    .then(response => response.arrayBuffer())
    .then(buffer => ctx.decodeAudioData(buffer));
}
