import {
  SET_AUDIO_STATUS,
  SET_AUDIO_CLIP_STATUS,
  AUDIO_STOP_ALL
} from "../actions";

/**
 * Audioset session state
 */
const initialState = {
  isPlaying: false,
  status: {}
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case SET_AUDIO_STATUS:
      return {
        ...state,
        isPlaying: action.status.isPlaying,
        time: action.status.time
      };
    case SET_AUDIO_CLIP_STATUS:
      return {
        ...state,
        status: { ...state.status, [action.clipId]: action.status }
      };
    case AUDIO_STOP_ALL:
      return { ...state, status: {} };
    default:
      return state;
  }
}
