import { CURRENT_USER_INFO, LOGOUT } from "./types";

export const currentUserInfo = (id, token, username) => {
  return {
    type: CURRENT_USER_INFO,
    payload: {
      _id: id,
      token: token,
      username: username,
    },
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT,
    payload: null,
  };
};
