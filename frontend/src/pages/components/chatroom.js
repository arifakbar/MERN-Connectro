import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";

import { userById } from "../../functions/user";
import history from "../../history";
import {
  getTheirConversation,
  newConversation,
} from "../../functions/conversation";
import { addMessage, getMessage } from "../../functions/messages";

function ChatRoom(props) {
  const { user } = props;
  const { userId } = props.match.params;
  const [chatUser, setChatUser] = useState({});
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState(null);
  const [newMsg, setNewMsg] = useState("");
  const [arrivalMsg, setArrivalMsg] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [isOnline, setIsOnline] = useState(false);

  const socket = useRef();

  useEffect(() => {
    if (user && user._id === userId) {
      history.push("/chat");
    } else {
      loadUser();
    }
  }, []);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMsg", (data) => {
      setArrivalMsg({
        Sender: data.senderId,
        Text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (data) => {
      data.forEach((d) => {
        if (d.userId === chatUser?._id) {
          setIsOnline(true);
        }
      });
    });
  }, [user]);

  useEffect(() => {
    loadConversation();
  }, []);

  useEffect(() => {
    var objDiv = document.getElementById("your_div");
    objDiv.scrollTop = objDiv.scrollHeight;
    // document
    //   .getElementById("your_div")
    //   .scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  const loadConversation = async () => {
    try {
      const res = await getTheirConversation(user.token, user._id, userId);
      if (res.data.data === null) {
        const res2 = await newConversation(user.token, user._id, userId);
        setConversation(res2.data.data);
      } else {
        setConversation(res.data.data);
        const res3 = await getMessage(user.token, res.data.data._id);
        setMessages(res3.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const check =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  const loadUser = async () => {
    try {
      const res = await userById(userId);
      setChatUser(res.data.data);
      const res2 = await userById(user._id);
      setLoggedInUser(res2.data.data);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    socket.current.emit("sendMsg", {
      senderId: user._id,
      receiverId: chatUser && chatUser._id,
      text: newMsg,
    });
    try {
      await addMessage(user.token, conversation._id, user._id, newMsg);
      loadConversation();
      setNewMsg("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    arrivalMsg &&
      userId === arrivalMsg.Sender &&
      setMessages((prev) => [...prev, arrivalMsg]);
  }, [arrivalMsg]);

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
            <h1 className="text-white text-xl capitalize">
              {chatUser.username}
            </h1>
            <p className="text-sm text-white">{isOnline && "Online"}</p>
          </Link>
        </div>
        <div
          id="your_div"
          className="py-3 overflow-y-auto text-white"
          style={{ height: "79%" }}
        >
          {messages && messages.length > 0 ? (
            <>
              {messages.map((m) => {
                return (
                  <div key={m._id}>
                    {m.Sender.toString() !== user._id.toString() ? (
                      <div className="m-2 flex items-center gap-5 p-1">
                        <div
                          className="overflow-hidden h-8 w-8 "
                          style={{ borderRadius: "50%" }}
                        >
                          <img
                            src={
                              !chatUser.profilePic
                                ? check
                                : chatUser.profilePic.url
                            }
                            alt="NF"
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <h1 style={{ maxWidth: "50%" }}>{m.Text}</h1>
                      </div>
                    ) : (
                      <div className="m-2 flex flex-row-reverse items-center gap-5 p-1">
                        <div
                          className="overflow-hidden h-8 w-8 bg-black"
                          style={{ borderRadius: "50%" }}
                        >
                          <img
                            src={
                              !loggedInUser.profilePic
                                ? check
                                : loggedInUser.profilePic.url
                            }
                            alt="NF"
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <h1 style={{ maxWidth: "50%" }}>{m.Text}</h1>
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          ) : (
            <h1 className="text-center my-1">No messages</h1>
          )}
        </div>
        <form
          className="absolute bottom-0 container flex items-center gap-2 shadow-md border-t-2 p-2"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className=" border-2 p-2 w-full"
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            required
          />
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
