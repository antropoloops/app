import { combineReducers } from "redux";
import audioset from "./reducers/audioset";
import audio from "./reducers/audio";
import tracks from "./reducers/tracks";

/**
 * The session stores all state that can be shared between instances connected
 */
export default combineReducers({
  audioset,
  audio,
  tracks
});
