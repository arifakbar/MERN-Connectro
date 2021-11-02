import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Spinner from "../components/Spinner";
import { populatedUserById } from "../../functions/user";

function Following(props) {
  const { user } = props;
  const { userId } = props.match.params;
  const [otherUser, setOtherUser] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadOtherUser();
  }, []);

  const loadOtherUser = async () => {
    try {
      setLoading(true);
      const res = await populatedUserById(userId);
      setOtherUser(res.data.data.following);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="px-3">
      <h1
        className="text-center text-3xl my-5 underline"
        style={{ color: "gold", fontFamily: "Sail" }}
      >
        Following
      </h1>
      <br />
      {loading ? (
        <div className="center-form">
          <Spinner />
        </div>
      ) : (
        <ul className="">
          {otherUser &&
            otherUser.map((f) => {
              return (
                <Link to={`/user/${f._id}`}>
                  <li
                    className="border-2  p-3 m-4 shadow-md"
                    style={{ borderColor: "white", color: "gold" }}
                    key={f._id}
                  >
                    {f.username}
                  </li>
                </Link>
              );
            })}
        </ul>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return { user: state.auth };
};

export default connect(mapStateToProps)(Following);
