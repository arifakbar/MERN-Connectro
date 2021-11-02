import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  getAllPosts,
  likePost,
  dislikePost,
  addComment,
} from "../functions/posts";

function Home(props) {
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState("");
  const [number, setNumber] = useState(2);
  const { user } = props;

  useEffect(() => {
    loadPosts();
  }, [number]);

  const loadPosts = async () => {
    try {
      const res = await getAllPosts(number);
      setPosts(res.data.data);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const updateNumber = () => {
    setNumber(number + 2);
  };

  window.onscroll = function () {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      updateNumber();
    }
  };

  const handleLike = async (p) => {
    try {
      if (p.likes.includes(user._id)) {
        await likePost(user.token, "unlike", p._id);
      } else {
        await likePost(user.token, "like", p._id);
      }
      loadPosts();
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const handleDislike = async (p) => {
    try {
      if (p.dislikes.includes(user._id)) {
        await dislikePost(user.token, "undislike", p._id);
      } else {
        await dislikePost(user.token, "dislike", p._id);
      }
      loadPosts();
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const handleComment = async (e, p) => {
    e.preventDefault();
    try {
      await addComment(user.token, comment, p._id);
      setComment("");
      loadPosts();
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="container-fluid text-center p-8 xl:px-48 ">
      {posts.length > 0 &&
        posts.map((p) => {
          return (
            <div
              className="flex flex-col md:flex-row gap-5 my-5 border-2 p-2 shadow-xl"
              key={p._id}
              style={{ color: "white" }}
            >
              <div className="overflow-hidden w-full md:w-1/2 h-96">
                <img
                  src={p.image}
                  alt="NF"
                  className="object-fill h-full w-full"
                />
              </div>
              <div className="flex flex-col gap-2 w-full md:w-1/2 text-left">
                <Link to={`/user/${p.postedBy._id}`}>
                  <h1 style={{ color: "gold" }}>
                    {p.postedBy.username.toUpperCase()}
                  </h1>
                </Link>
                <p>{p.title}</p>
                <small>{p.content}</small>
                <div className="flex gap-10">
                  <div className="flex gap-3">
                    <i
                      className="hover:text-red-500"
                      style={
                        p.likes.includes(user._id)
                          ? { color: "red" }
                          : { color: "black" }
                      }
                      onClick={() => handleLike(p)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        cursor="pointer"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                        />
                      </svg>
                    </i>
                    <small style={{ color: "gold" }}>
                      ( {p.likes.length} )
                    </small>
                  </div>
                  <div className="flex gap-3">
                    <i
                      className="hover:text-red-500"
                      style={
                        p.dislikes.includes(user._id)
                          ? { color: "red" }
                          : { color: "black" }
                      }
                      onClick={() => handleDislike(p)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        cursor="pointer"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
                        />
                      </svg>
                    </i>

                    <small style={{ color: "gold" }}>
                      ( {p.dislikes.length} )
                    </small>
                  </div>
                </div>
                <h1>Comments</h1>
                <div className="flex flex-col justify-between border-2 border-black  p-2 overflow-y-auto overflow-x-hidden h-full">
                  <div>
                    {p.comments.length > 0
                      ? p.comments.map((c) => {
                          return (
                            <p key={c._id}>
                              <Link
                                to={`/user/${p.postedBy._id}`}
                                style={{ color: "gold" }}
                              >
                                {c.commentedBy.username}
                              </Link>{" "}
                              : {c.text}
                            </p>
                          );
                        })
                      : "No comments yet."}
                  </div>
                  <form
                    className=" p-2 flex gap-5"
                    onSubmit={(e) => handleComment(e, p)}
                  >
                    <input
                      type="text"
                      placeholder="Comment here..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full border-b-2  px-2 py-1 bg-transparent"
                      style={{ borderColor: "gold" }}
                      required
                    />
                    <button
                      className="px-3 py-1"
                      style={{ background: "gold", color: "#091921" }}
                    >
                      Send
                    </button>
                  </form>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

const mapStateToProps = (state) => {
  return { user: state.auth };
};

export default connect(mapStateToProps)(Home);
