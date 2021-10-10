import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { connect } from "react-redux";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(username, email, password);
      if (res.data.ok) {
        toast.success("Signed up successfully. Please login to continue.");
        history.push("/");
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
        <h1 className="center-h1">SIGNUP</h1>
        <div className="form-div">
          <label>Username</label>
          <input
            type="text"
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-div">
          <label>Email</label>
          <input
            type="text"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-div">
          <label>Password</label>
          <input
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="border-2 py-1 px-4 my-3">Signup</button>
        <br />
        <small>
          Already have an account ?
          <Link to="/" className="text-green-300 mx-1">
            Login.
          </Link>
        </small>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { user: state.auth };
};

export default connect(mapStateToProps)(Signup);
