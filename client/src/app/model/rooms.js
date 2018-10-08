import { CONNECTED, DISCONNECTED, USER } from "../../session/room";

const initialState = {
  status: "disconnected",
  userId: ""
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CONNECTED:
      return { ...state, status: "connected" };
    case DISCONNECTED:
      return { ...state, status: "disconnected" };
    case USER:
      return { ...state, userId: payload };

    default:
      return state;
  }
}
