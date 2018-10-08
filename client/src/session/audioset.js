export function loadIndex(root) {
  return fetch(`${root}/audioset.index.json`).then(response => response.json());
}

export function loadSet(root, setId) {
  return fetch(`${root}/${setId}.audioset.json`).then(res => res.json());
}
