import { throttle } from "lodash";

const STORAGE_KEY = "atpls/session";

export function loadState() {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

/**
 * Save the store state into local storage
 *
 * @param {*} store
 * @param {*} ms - time in milliseconds
 */
export function autosave(store, ms = 1000) {
  store.subscribe(
    throttle(() => {
      saveState(store.getState());
    }, ms)
  );
}

export function saveState(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (e) {
    console.log("Error saving state", e);
  }
}

if (typeof window !== undefined) {
  // to clear the storage manually
  window.resetLocalStorage = () => saveState({});
}
