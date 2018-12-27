import { PRESS_PAD, RELEASE_PAD } from "../actions";

/**
 * Audioset session state
 */
const initialState = {};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case PRESS_PAD:
      return { ...state, [action.clipId]: true };
    case RELEASE_PAD:
      return { ...state, [action.clipId]: false };
    default:
      return state;
  }
}
