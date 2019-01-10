import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { setAudioset } from "./session/actions";
import { addEffects } from "./session/effects";
import Rooms from "./rooms";
import Audioset from "./audioset";
import Audio from "./audio";
import Visuals from "./visuals";
import App from "./ui/App";
import Modal from "react-modal";
import Inputs from "./audioset/inputs";
import { fetchAudioset } from "./audioset";
import createStore from "./createStore";

const ENV = process.env.NODE_ENV;
const WEBSOCKETS_URL = "http://localhost:4000";

const store = createStore();

const session = {
  getSession: store.getState,
  getAudioset: () => store.getState().audioset,
  dispatch: store.dispatch
};
loadCurrentAudioset(session);

const rooms = new Rooms(WEBSOCKETS_URL);
rooms.onStatus = status => console.log("room status", status);
rooms.createRoom();

addEffects(Inputs.effects(session));

// This two pieces will be moved eventually to code-spliting
addEffects(Audio.effects(session));
addEffects(Visuals.init());

function loadCurrentAudioset(session) {
  const { audioset } = session.getSession();
  if (audioset) {
    // reload the audioset on development
    if (ENV === "development")
      fetchAudioset(audioset.id).then(audioset =>
        session.dispatch(setAudioset(audioset))
      );
    else if (ENV !== "development") session.dispatch(setAudioset(audioset));
  }
}

const element = document.getElementById("app");
Modal.setAppElement(element);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  element
);
