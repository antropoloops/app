import { createStore, compose, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
import { loadState, saveState } from "./browser/localStorage";

// the session effects middlewasre
import effects from "./session/effects";
import session from "./session";

/**
 * Create an store
 */
export default function() {
  const initialState = loadState();
  const enhancer = compose(
    applyMiddleware(effects),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  );

  const store = createStore(session, initialState, enhancer);

  store.subscribe(() => saveState(store.getState()));
  return store;
}
