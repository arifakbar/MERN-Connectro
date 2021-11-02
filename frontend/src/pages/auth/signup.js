import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { connect } from "react-redux";

import Spinner from "../components/Spinner";
import history from "../../history";
import { signup } from "../../functions/auth";

function Signup(props) {
  useEffect(() => {
    if (props.user && props.user.token) {
      history.push("/home");
    }
  }, []);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await signup(username, email, password);
      if (res.data.ok) {
        toast.success("Signed up successfully. Please login to continue.");
        setLoading(false);
        history.push("/");
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
          className="center-form  p-10 shadow-xl"
          onSubmit={handleSubmit}
          style={{
            color: "gold",
            background: "#091921",
          }}
        >
          <h1 className="center-h1" style={{ fontFamily: "Sail" }}>
            Connect With Us
          </h1>
          <div className="form-div">
            <label>Username</label>
            <input
              type="text"
              className="form-input"
              style={{ color: "white" }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-div">
            <label>Email</label>
            <input
              type="text"
              className="form-input"
              style={{ color: "white" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-div">
            <label>Password</label>
            <input
              type="password"
              className="form-input"
              style={{ color: "white" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="py-2 px-8 my-3"
            style={{
              background: "gold",
              color: "#091921",
              fontFamily: "Josefin Sans",
            }}
          >
            SIGNUP
          </button>
          <br />
          <small>
            Already have an account ?
            <Link to="/" className="text-green-300 mx-1">
              Login.
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

export default connect(mapStateToProps)(Signup);
