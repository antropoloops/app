import createStore from "./createStore";
import eventsToStore from "./eventsToStore";

export default function(session) {
  const store = createStore();
  eventsToStore(session, store.dispatch);
  return store;
}
