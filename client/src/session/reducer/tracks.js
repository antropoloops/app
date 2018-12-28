import {
  SET_AUDIOSET,
  CHANGE_TRACK_VOLUME,
  SET_AUDIO_CLIP_STATUS
} from "../actions";

const initialState = {
  playing: {},
  volumes: {}
};

const valueByTrack = (audioset, value) =>
  audioset
    ? audioset.tracks.reduce((obj, t) => {
        obj[t.id] = value;
        return obj;
      }, {})
    : {};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case SET_AUDIOSET:
      return {
        playing: valueByTrack(action.audioset, 0),
        volumes: valueByTrack(action.audioset, 75)
      };
    case SET_AUDIO_CLIP_STATUS:
      const { trackId } = action;
      const dir = action.status.isPlaying ? 1 : -1;
      return {
        ...state,
        playing: {
          ...state.playing,
          [trackId]: state.playing[trackId] + dir
        }
      };
    case CHANGE_TRACK_VOLUME:
      return {
        ...state,
        volumes: { ...state.volumes, [action.trackId]: action.value }
      };
    default:
      return state;
  }
}
