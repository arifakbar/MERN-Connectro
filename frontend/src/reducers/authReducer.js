import { CURRENT_USER_INFO, LOGOUT } from "../actions/types";

let intialState = [];

if (typeof window !== undefined) {
  if (localStorage.getItem("creds")) {
    intialState = JSON.parse(localStorage.getItem("creds"));
  } else {
    intialState = [];
  }
}

export const authReducer = (state = intialState, action) => {
  switch (action.type) {
    case CURRENT_USER_INFO:
      return action.payload;
    case LOGOUT:
      return action.payload;
    default:
      return state;
  }
};
