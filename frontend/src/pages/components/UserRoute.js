import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router";

import history from "../../history";

function UserRoute(props) {
  const { user, ...rest } = props;

  const redirect = () => {
    return history.push("/");
  };

  return user && user.token ? (
    <Route {...rest} />
  ) : (
    <div>Redirecting {redirect()} </div>
  );
}

const mapStateToProps = (state) => {
  return { user: state.auth };
};

export default connect(mapStateToProps)(UserRoute);
