import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { loadState, autosave } from "./browser/localStorage";
import { setAudioset } from "./session/actions";
import Session from "./session";
import Rooms from "./rooms";
import Audio from "./audio";
import Visuals from "./visuals";
import App from "./ui/App";
import Modal from "react-modal";
import Inputs from "./audioset/inputs";
import { fetchAudioset } from "./audioset";

const ENV = process.env.NODE_ENV;
const WEBSOCKETS_URL = "http://localhost:4000";

const session = Session.init(loadState());
autosave(session.store);

Inputs.connect(session);

// This two pieces will be moved eventually to code-spliting
Audio.connect(session);
Visuals.connect(session);

const audioset = session.getAudioset();
if (audioset) {
  // reload the audioset on development
  if (ENV === "development")
    fetchAudioset(audioset.id).then(audioset =>
      session.dispatch(setAudioset(audioset))
    );
  else if (ENV !== "development") session.dispatch(setAudioset(audioset));
}

const element = document.getElementById("app");
Modal.setAppElement(element);
ReactDOM.render(
  <Provider store={session.store}>
    <App events={session.events} />
  </Provider>,
  element
);
