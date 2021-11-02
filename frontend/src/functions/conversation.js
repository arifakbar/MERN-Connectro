import axios from "axios";

export const getUserConversation = async (authToken) => {
  return await axios.get(process.env.REACT_APP_API + "conversation", {
    headers: {
      authToken: authToken,
    },
  });
};

export const newConversation = async (authToken, senderId, recieverId) => {
  return await axios.post(
    process.env.REACT_APP_API + "conversation",
    { senderId, recieverId },
    {
      headers: {
        authToken: authToken,
      },
    }
  );
};

export const getTheirConversation = async (
  authToken,
  firstUserId,
  secondUserId
) => {
  return await axios.get(
    process.env.REACT_APP_API +
      "conversation/" +
      firstUserId +
      "/" +
      secondUserId,
    {
      headers: {
        authToken: authToken,
      },
    }
  );
};
