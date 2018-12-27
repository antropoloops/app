import { combineReducers } from "redux";
import audioset from "./audioset";
import pads from "./pads";
import audio from "./audio";
import chat from "./chat";

/**
 * The session stores all state that can be shared between instances connected
 */
export default combineReducers({
  audioset,
  pads,
  audio,
  chat
});
