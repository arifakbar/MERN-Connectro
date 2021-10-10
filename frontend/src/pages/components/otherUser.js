import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getUserPosts } from "../../functions/posts";
import { userById, follow } from "../../functions/user";
import history from "../../history";

function OtherUser(props) {
  const { userId } = props.match.params;
  const [posts, setPosts] = useState("");
  const [user, setUser] = useState({});
  const [following, setFollowing] = useState(false);

  const { loggedUser } = props;

  const check =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  useEffect(() => {
    if (userId === loggedUser._id) {
      history.push("/profile");
    }
    loadUser();
    loadUserPosts();
  }, [following, userId]);

  const loadUserPosts = async () => {
    try {
      const res = await getUserPosts(userId);
      setPosts(res.data.data);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const loadUser = async () => {
    try {
      const res = await userById(userId);
      setUser(res.data.data);
      if (user.followers && user.followers.includes(loggedUser._id)) {
        setFollowing(true);
      } else {
        setFollowing(false);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const handleFollow = async () => {
    try {
      if (user.followers && user.followers.includes(loggedUser._id)) {
        await follow(loggedUser.token, "unfollow", user._id);
        setFollowing(false);
        loadUser();
      } else {
        await follow(loggedUser.token, "follow", user._id);
        setFollowing(true);
        loadUser();
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="p-5 flex flex-col md:flex-row justify-around gap-10 md:h-screen2 md:overflow-hidden">
      <div className="md:w-2/5  flex items-center flex-col justify-center gap-5  md:h-screen2">
        <div className="rounded-full h-56 w-56 flex items-center justify-center overflow-hidden">
          <img
            src={user.profilePic ? user.profilePic.url : check}
            alt="NF"
            className="h-full w-full object-cover"
          />
        </div>
        <p className="text-xl font-semibold">
          {user.username && user.username.toUpperCase()}
        </p>
        <p>{posts.length} Posts</p>
        <div className="flex gap-5">
          <Link to={`/user/follower/${userId}`}>
            <p className="border-2 p-2 shadow-md ">
              {user.followers && user.followers.length} Follower's
            </p>
          </Link>
          <Link to={`/user/following/${userId}`}>
            <p className="border-2 p-2 shadow-md ">
              {user.following && user.following.length} Following
            </p>
          </Link>
        </div>
        <button
          className="border-2 p-2 shadow-xl w-64 bg-blue-400 text-white cursor-pointer"
          onClick={handleFollow}
        >
          {following ? "Unfollow" : "Follow"}
        </button>
      </div>
      <div className="md:w-3/5  flex flex-col  pt-2 gap-5 md:h-screen ">
        <p className="text-center text-xl font-semibold ">User Posts</p>
        <div className="flex w-full pt-2 pb-36 shadow-md flex-wrap justify-center gap-5 md:overflow-auto">
          {posts.length > 0
            ? posts.map((p) => {
                return (
                  <div key={p._id} className="md:w-1/4 h-48">
                    <div className=" h-44 overflow-hidden">
                      <img
                        src={p.image}
                        alt="NF"
                        className="w-full h-full object-fill"
                      />
                    </div>
                    <h3 style={{ fontFamily: "Roboto" }}>{p.title}</h3>
                  </div>
                );
              })
            : "No Posts Yet"}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { loggedUser: state.auth };
};

export default connect(mapStateToProps)(OtherUser);
