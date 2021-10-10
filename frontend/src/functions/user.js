import axios from "axios";

export const currentUserProfile = async (authToken) => {
  return await axios.get(process.env.REACT_APP_API + "current-user-profile", {
    headers: { authToken: authToken },
  });
};

export const certainUserProfile = async () => {
  return await axios.get(process.env.REACT_APP_API + "certain-user-profile");
};

export const changeUserProfilePic = async (authToken, profilePic) => {
  return await axios.post(
    process.env.REACT_APP_API + "change-profile-pic",
    { profilePic: profilePic },
    {
      headers: { authToken: authToken },
    }
  );
};

export const userById = async (userId) => {
  return await axios.get(process.env.REACT_APP_API + "user/" + userId);
};

export const populatedUserById = async (userId) => {
  return await axios.get(
    process.env.REACT_APP_API + "user-populated/" + userId
  );
};

export const follow = async (authToken, action, otherUserId) => {
  return await axios.put(
    process.env.REACT_APP_API + "user/follow",
    {
      otherUserId: otherUserId,
      action: action,
    },
    {
      headers: {
        authToken: authToken,
      },
    }
  );
};

export const searchUser = async (query) => {
  return await axios.post(process.env.REACT_APP_API + "user/search", {
    query: query,
  });
};
