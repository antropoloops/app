import { SET_LOADED } from "./audiosets";
const initialState = {
  set: null,
  track: null
};

export const OPEN_TRACK = "@control/openTrack";
export const openTrack = track => ({ type: OPEN_TRACK, payload: track });

export const CLOSE_TRACK = "@control/closeTrack";
export const closeTrack = () => ({ type: CLOSE_TRACK });

export default function reduce(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_LOADED:
      return { ...state, set: payload, track: null };

    case OPEN_TRACK:
      return { ...state, track: payload };

    case CLOSE_TRACK:
      return { ...state, track: null };

    default:
      return state;
  }
}
