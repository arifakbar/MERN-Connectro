import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { connect } from "react-redux";

import { login } from "../../functions/auth";
import history from "../../history";
import { currentUserInfo } from "../../actions/index";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (props.user && props.user.token) {
      history.push("/home");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let creds = {};
      const res = await login(email, password);
      if (!res.data.data) {
        toast.error("Wrong credentials.");
      } else {
        creds = {
          _id: res.data.data._id,
          token: res.data.data.token,
          username: res.data.data.username,
        };
        if (typeof window !== undefined) {
          localStorage.setItem("creds", JSON.stringify(creds));
        }
        props.currentUserInfo(
          res.data.data._id,
          res.data.data.token,
          res.data.data.username
        );
        toast.success("Logged in successfully ");
        setEmail("");
        setPassword("");
        history.push("/home");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form
        className="center-form border-2 p-10 shadow-xl"
        onSubmit={handleSubmit}
      >
        <h1 className="center-h1">LOGIN</h1>
        <div className="form-div">
          <label>Email</label>
          <input
            type="text"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-div">
          <label>Password</label>
          <input
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <small>
          Forgot Password ?
          <a href="/" className="text-red-300 mx-1">
            Click here.
          </a>
        </small>
        <br />
        <button className="border-2 py-1 px-4 my-3">Login</button>
        <br />
        <small>
          Don't have an account ?
          <Link to="/signup" className="text-green-300 mx-1">
            Signup.
          </Link>
        </small>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { user: state.auth };
};

export default connect(mapStateToProps, { currentUserInfo: currentUserInfo })(
  Login
);
