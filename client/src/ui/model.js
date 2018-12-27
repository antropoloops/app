import { loadAudioset } from "../audioset";

const initialState = {
  loading: true
};

const SET_AUDIOSET_INDEX = "SET_AUDIOSET_INDEX";
export const setAudiosetIndex = index => ({
  type: SET_AUDIOSET_INDEX,
  payload: index
});

const SET_AUDIOSET = "SET_AUDIOSET";
export const setAudioset = audioset => dispatch => {
  loadAudioset(audioset).then(payload =>
    dispatch({ type: SET_AUDIOSET, payload })
  );
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case SET_AUDIOSET_INDEX:
      return { ...state, audiosetIndex: action.payload };
    case SET_AUDIOSET:
      return { ...state, audioset: action.payload };
    default:
      return state;
  }
}
