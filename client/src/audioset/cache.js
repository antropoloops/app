const CACHE = [];

export function memo(key, create) {
  const cached = CACHE[key];
  if (cached) return cached;
  return (CACHE[key] = create());
}

export function cachedFetch(url, decode) {
  if (CACHE[url]) return Promise.resolve(CACHE[url]);
  return fetch(url)
    .then(decode)
    .then(data => {
      CACHE[url] = data;
      return data;
    });
}
