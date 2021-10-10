import axios from "axios";

export const login = async (email, password) => {
  return await axios.post(process.env.REACT_APP_API + "login", {
    email: email,
    password: password,
  });
};

export const signup = async (username, email, password) => {
  return await axios.post(process.env.REACT_APP_API + "signup", {
    username: username,
    email: email,
    password: password,
  });
};
