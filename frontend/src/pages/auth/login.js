import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { connect } from "react-redux";

import { login } from "../../functions/auth";
import history from "../../history";
import { currentUserInfo } from "../../actions/index";
import Spinner from "../components/Spinner";

function Login(props) {
  const [email, setEmail] = useState("admin@admin.com");
  const [password, setPassword] = useState("admin");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.user && props.user.token) {
      history.push("/home");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let creds = {};
      const res = await login(email, password);
      if (!res.data.data) {
        toast.error("Wrong credentials.");
        setLoading(false);
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
        setLoading(false);
        toast.success("Logged in successfully ");
        setEmail("");
        setPassword("");
        history.push("/home");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="center-form">
          <Spinner />
        </div>
      ) : (
        <form
          className="center-form  p-10 shadow-2xl"
          onSubmit={handleSubmit}
          style={{
            color: "gold",
            background: "#091921",
          }}
        >
          <h1 className="center-h1" style={{ fontFamily: "Sail" }}>
            Let's Connect
          </h1>
          <div className="form-div">
            <label>Email</label>
            <input
              type="text"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ color: "white" }}
            />
          </div>
          <div className="form-div">
            <label>Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              style={{ color: "white" }}
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
          <button
            className="py-2 px-8 my-3"
            style={{
              background: "gold",
              color: "#091921",
              fontFamily: "Josefin Sans",
            }}
          >
            LOGIN
          </button>
          <br />
          <small>
            Don't have an account ?
            <Link to="/signup" className="text-green-300 mx-1">
              Signup.
            </Link>
          </small>
        </form>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return { user: state.auth };
};

export default connect(mapStateToProps, { currentUserInfo: currentUserInfo })(
  Login
);
