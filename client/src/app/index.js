import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import * as serviceWorker from "../offline/serviceWorker";
import createStore from "./store";
import { loadIndex } from "./model/audiosets";
import createSampler from "../audio";
import App from "./ui/App";
import "./ui/index.css";
import { createSession } from "../session";

// Create session first!
const session = createSession("/sets");

const store = createStore(session);
window.store = store;
createSampler(session);

//store.dispatch(loadAllAudiosets());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);

const state = store.getState();
if (!state.audiosets.index) {
  store.dispatch(loadIndex("/sets"));
}
if (state.audiosets.current) {
  session.use(state.audiosets.current);
}

// const events = eventBus();
// events.on("*", (type, payload) => {
//   console.log("EVENT", type, payload);
// });

// events.on("*", (type, payload) => store.dispatch({ type, payload }));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
