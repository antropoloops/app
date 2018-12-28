import { events } from "./events";
import createStore from "./createStore";

let store = null;

export function init(initialState) {
  if (store) throw Error("Session only can be initialized once");
  store = createStore(initialState);

  const dispatch = store.dispatch;
  const getAudioset = () => store.getState().audioset;
  return { events, store, getAudioset, dispatch };
}

export default { init, events };
