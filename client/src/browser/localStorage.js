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

export const saveState = throttle(state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (e) {
    console.log("Error saving state", e);
  }
}, 1000);

if (typeof window !== undefined) {
  // to clear the storage manually
  window.resetLocalStorage = () => saveState({});
}
