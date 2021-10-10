import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import { userById } from "../../functions/user";
import history from "../../history";

function ChatRoom(props) {
  const { user } = props;
  const { userId } = props.match.params;
  const [chatUser, setChatUser] = useState({});

  useEffect(() => {
    if (user && user._id === userId) {
      history.push("/chat");
    } else {
      loadUser();
    }
  }, []);
  const check =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  const loadUser = async () => {
    try {
      const res = await userById(userId);
      setChatUser(res.data.data);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="container-fluid w-full h-screen2 overflow-hidden p-5 flex justify-center">
      <div className="container relative shadow-xl border-2 pb-5">
        <div className="border-b-2 shadow-md py-4 flex items-center gap-5 px-5">
          <Link to={`/user/${userId}`}>
            <div
              className="overflow-hidden h-12 w-12 bg-black"
              style={{ borderRadius: "50%" }}
            >
              <img
                src={!chatUser.profilePic ? check : chatUser.profilePic.url}
                alt="NF"
                className="object-cover w-full h-full"
              />
            </div>
          </Link>
          <Link to={`/user/${userId}`}>
            <h1>{chatUser.username}</h1>
          </Link>
        </div>
        <div className="py-3 overflow-y-auto" style={{ height: "80%" }}>
          <div className="m-2 flex items-center gap-5 p-1 bg-yellow-400">
            <div
              className="overflow-hidden h-8 w-8 bg-black"
              style={{ borderRadius: "50%" }}
            >
              <img
                src={!chatUser.profilePic ? check : chatUser.profilePic.url}
                alt="NF"
                className="object-cover w-full h-full"
              />
            </div>
            <h1 style={{ maxWidth: "50%" }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
            </h1>
          </div>
          <div className="float-right m-2 flex flex-row-reverse items-center gap-5 p-1 bg-pink-500 ">
            <div
              className="overflow-hidden h-8 w-8 bg-black"
              style={{ borderRadius: "50%" }}
            >
              <img
                src={!user.profilePic ? check : user.profilePic.url}
                alt="NF"
                className="object-cover w-full h-full"
              />
            </div>
            <h1 style={{ maxWidth: "50%" }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </h1>
          </div>
        </div>
        <form className="absolute bottom-0 container flex items-center gap-2 shadow-md border-t-2 p-2">
          <input type="text" className=" border-2 p-2 w-full" />
          <button className="border-2 p-2 bg-green-500 text-white">Send</button>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { user: state.auth };
};

export default connect(mapStateToProps)(ChatRoom);
