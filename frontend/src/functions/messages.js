import axios from "axios";

export const addMessage = async (authToken, ConversationId, Sender, Text) => {
  return await axios.post(
    process.env.REACT_APP_API + "message",
    { ConversationId, Sender, Text },
    {
      headers: { authToken: authToken },
    }
  );
};

export const getMessage = async (authToken, ConversationId) => {
  return await axios.get(
    process.env.REACT_APP_API + "message/" + ConversationId,
    {
      headers: { authToken: authToken },
    }
  );
};
