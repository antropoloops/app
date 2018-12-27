import { events } from "./events";
import createStore from "./createStore";

let store = null;

export function init(initialState) {
  if (store) throw Error("Session only can be initialized once");
  store = createStore(initialState);
  return { events, store };
}

export default { init, events };
