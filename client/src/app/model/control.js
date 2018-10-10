import { SET_LOADED } from "./audiosets";
import { getSession } from "../../session";

const initialState = {
  set: null,
  track: null,
  clipsPlaying: {},
  tracksPlaying: {}
};

export const OPEN_TRACK = "@control/openTrack";
export const openTrack = track => ({ type: OPEN_TRACK, payload: track });

export const CLOSE_TRACK = "@control/closeTrack";
export const closeTrack = () => ({ type: CLOSE_TRACK });

export const PAD_PRESS = "@control/padPress";
export const padPress = clipId => dispatch =>
  getSession().player.pressPad(clipId);
export const PAD_RELEASE = "@control/padRelease";
export const padRelease = clipId => dispatch =>
  getSession().player.releasePad(clipId);

export const CLIP_ON = "@control/clipOn";
export const clipOn = (clipId, track) => ({
  type: CLIP_ON,
  payload: { clipId, track }
});
export const CLIP_OFF = "@control/clipOff";
export const clipOff = (clipId, track) => ({
  type: CLIP_OFF,
  payload: { clipId, track }
});

export default function reduce(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CLIP_ON:
      return setPlaying(state, payload, true);

    case CLIP_OFF:
      return setPlaying(state, payload, false);

    case SET_LOADED:
      return { ...initialState, set: payload };

    case OPEN_TRACK:
      return { ...state, track: payload };

    case CLOSE_TRACK:
      return { ...state, track: null };

    default:
      return state;
  }
}

function setPlaying(state, { clipId, track }, isPlaying) {
  const clipsPlaying = { ...state.clipsPlaying };
  const tracksPlaying = { ...state.tracksPlaying };
  clipsPlaying[clipId] = isPlaying;
  tracksPlaying[track] = isPlaying;
  return { ...state, clipsPlaying, tracksPlaying };
}
