import { SET_LOADED } from "./audiosets";
const initialState = {
  set: null
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_LOADED:
      return { ...state, set: payload };

    default:
      return state;
  }
}
