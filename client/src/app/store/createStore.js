import throttle from "lodash/throttle";
import { combineReducers, createStore, applyMiddleware, compose } from "redux";
// middleware
import thunk from "redux-thunk";
import { loadState, saveState } from "./localStorage";
import app from "../model/rooms";
import audiosets from "../model/audiosets";
import control from "../model/control";
import player from "../model/player";

export default function create() {
  const initialState = clearState(loadState());
  console.log("INITIAL", initialState);

  const reducer = combineReducers({
    app,
    audiosets,
    control,
    player
  });
  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
  store.subscribe(
    throttle(() => {
      saveState(store.getState());
    }, 1000)
  );
  return store;
}

function clearState(state) {
  state.control.clipsPlaying = {};
  state.control.tracksPlaying = {};
  return state;
}
