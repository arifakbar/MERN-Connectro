import React from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Nav from "./pages/components/nav";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import UserRoute from "./pages/components/UserRoute";
import UserProfile from "./pages/user/userProfile";
import CreatePost from "./pages/user/createPost";
import OtherUser from "./pages/components/otherUser";
import Follower from "./pages/user/follower";
import Following from "./pages/user/following";
import Chat from "./pages/user/chat";
import ChatRoom from "./pages/components/chatroom";

function App() {
  return (
    <>
      <ToastContainer />
      <Nav />
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <UserRoute path="/home" exact component={Home} />
        <UserRoute path="/profile" exact component={UserProfile} />
        <UserRoute path="/createPost" exact component={CreatePost} />
        <UserRoute path="/user/:userId" exact component={OtherUser} />
        <UserRoute path="/user/follower/:userId" exact component={Follower} />
        <UserRoute path="/user/following/:userId" exact component={Following} />
        <UserRoute path="/chat" exact component={Chat} />
        <UserRoute path="/chat/user/:userId" exact component={ChatRoom} />
      </Switch>
    </>
  );
}

export default App;
