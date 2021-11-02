import axios from "axios";

export const createPost = async (authToken, title, content, image) => {
  return await axios.post(
    process.env.REACT_APP_API + "posts",
    {
      title: title,
      content: content,
      image: image,
    },
    {
      headers: { authToken: authToken },
    }
  );
};

export const getAllPosts = async (number) => {
  return await axios.get(process.env.REACT_APP_API + "posts/" + number);
};

export const getUserPosts = async (userId) => {
  return await axios.get(
    process.env.REACT_APP_API + "userPosts/" + userId
    // , {
    //   headers: { authToken: authToken },
    // }
  );
};

export const deletePost = async (authToken, postId) => {
  return await axios.delete(process.env.REACT_APP_API + "post/" + postId, {
    headers: { authToken: authToken },
  });
};

export const likePost = async (authToken, action, postId) => {
  return await axios.put(
    process.env.REACT_APP_API + "like-post/" + postId,
    {
      action: action,
    },
    { headers: { authToken: authToken } }
  );
};

export const dislikePost = async (authToken, action, postId) => {
  return await axios.put(
    process.env.REACT_APP_API + "dislike-post/" + postId,
    {
      action: action,
    },
    { headers: { authToken: authToken } }
  );
};

export const addComment = async (authToken, text, postId) => {
  return await axios.put(
    process.env.REACT_APP_API + "add-comment/" + postId,
    {
      text: text,
    },
    { headers: { authToken: authToken } }
  );
};
