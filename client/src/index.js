import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { loadState, autosave } from "./localStorage";
import Session from "./session";
import Rooms from "./rooms";
import Audio from "./audio";
import Visuals from "./visuals";
import App from "./ui/App";
import "./index.css";
import Modal from "react-modal";

const WEBSOCKETS_URL = "http://localhost:4000";

const session = Session.init(loadState());
autosave(session.store);

// This two pieces will be moved eventually to code-spliting
Audio.connect(session);
Visuals.connect(session);

const element = document.getElementById("app");
Modal.setAppElement(element);
ReactDOM.render(
  <Provider store={session.store}>
    <App events={session.events} />
  </Provider>,
  element
);
