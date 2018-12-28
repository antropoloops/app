const CACHE = [];

function save(key, value) {
  if (key.startsWith("audioset://")) console.log("save", key, value);
  CACHE[key] = value;
  return value;
}
function get(key) {
  return CACHE[key];
}
function has(key) {
  return CACHE[key] !== undefined;
}

/**
 * Memoize for audiosets
 * @param {*} key
 * @param {*} create
 */
export function memo(audioset, key, create) {
  const ns = `audioset://${audioset.id}/${key}`;
  return has(ns) ? get(ns) : save(ns, create());
}

export function cachedFetch(url, decode) {
  if (has(url)) return Promise.resolve(get(url));
  console.log("Fetch", url);
  return fetch(url)
    .then(decode)
    .then(data => save(url, data));
}
