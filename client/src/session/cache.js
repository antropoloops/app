const resources = new Map();
const players = new Map();

const cached = cache => (set, create) => {
  const cached = cache.get(set);
  if (cached) return cached;
  const obj = create();
  cache.set(set, obj);
  return obj;
};

export const getResources = cached(resources);
export const getPlayer = cached(players);
