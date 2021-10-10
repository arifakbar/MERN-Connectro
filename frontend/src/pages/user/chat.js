import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { searchUser } from "../../functions/user";

function Chat(props) {
  const { user } = props;
  const [users, setUsers] = useState([]);
  const [text, setText] = useState("");

  const check =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch();
    }, 500);
    return () => clearTimeout(timer);
  }, [text]);

  const handleSearch = async () => {
    try {
      if (text.length > 0) {
        const res = await searchUser(text);
        setUsers(res.data.data);
        console.log(users);
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="container-fluid flex flex-col items-center py-5">
      <form className="border-2 container px-10 py-5">
        <input
          placeholder="Search"
          className="form-input w-full"
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </form>
      <br />
      <br />
      <div className="container">
        {users &&
          users.map((u) => {
            return (
              <Link
                to={`/chat/user/${u._id}`}
                className="flex items-center gap-10 mt-2 shadow-md px-5 py-3"
                key={u._id}
              >
                <div
                  className="overflow-hidden h-12 w-12 bg-black"
                  style={{ borderRadius: "50%" }}
                >
                  <img
                    src={!u.profilePic ? check : u.profilePic.url}
                    alt="NF"
                    className="object-cover w-full h-full"
                  />
                </div>
                <h1>{u.username}</h1>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { user: state.auth };
};

export default connect(mapStateToProps)(Chat);
