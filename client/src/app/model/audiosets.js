import { getSession } from "../../session";

const initialState = {
  status: null,
  index: null,
  current: null
};

const INDEX_LOADING = "@audioset/index-loading";
const indexLoading = () => ({ type: INDEX_LOADING });
const INDEX_LOADED = "@audioset/index-loaded";
const indexLoaded = index => ({ type: INDEX_LOADED, payload: index });

export const LOAD_INDEX = "@audioset/load-index";
export const loadIndex = (root = "/sets") => dispatch => {
  dispatch(indexLoading(root));
  getSession()
    .fetchIndex()
    .then(index => dispatch(indexLoaded(index)));
};

const SET_LOADING = "@audioset/set-loading";
const setLoading = setId => ({ type: SET_LOADING, payload: setId });
export const SET_LOADED = "@audioset/set-loaded";
const setLoaded = set => ({ type: SET_LOADED, payload: set });

export const LOAD_SET = "@audioset/load-set";
export const loadSet = setId => dispatch => {
  dispatch(setLoading(setId));
  getSession()
    .loadAudioset(setId)
    .then(set => dispatch(setLoaded(set)));
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case INDEX_LOADING:
      return {
        ...state,
        status: "loading",
        index: null,
        current: null
      };
    case INDEX_LOADED:
      return { ...state, status: "done", index: payload };
    case SET_LOADING:
      return { ...state, status: "loading", current: null };
    case SET_LOADED:
      return { ...state, status: "done", current: payload };
    default:
      return state;
  }
}
