import { SET_AUDIOSET } from "../actions";

/**
 * Audioset session state
 */
const initialState = null;

export default function reduce(state = initialState, action) {
  if (action.type === SET_AUDIOSET) return action.audioset;
  return state;
}
