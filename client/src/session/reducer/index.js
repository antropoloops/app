import { combineReducers } from "redux";
import audioset from "./audioset";
import audio from "./audio";
import tracks from "./tracks";

/**
 * The session stores all state that can be shared between instances connected
 */
export default combineReducers({
  audioset,
  audio,
  tracks
});
