import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import events from "./events";
import reducer from "./reducer";

/**
 * The session stores all state that can be shared between instances connected
 *
 * The session is a redux store!
 */
export default function createSession(initialState = {}) {
  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(events, thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f
    )
  );
  return store;
}
