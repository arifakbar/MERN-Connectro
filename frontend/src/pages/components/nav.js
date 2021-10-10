import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logoutUser } from "../../actions/index";
import history from "../../history";
import SearchModal from "./searchModal";

function Nav(props) {
  const { user } = props;

  const handleLogout = () => {
    if (typeof window !== undefined) {
      if (localStorage.getItem("creds")) {
        localStorage.removeItem("creds");
      }
    }
    props.logoutUser();
    const menu = document.querySelector(".Navbar");
    menu.classList.add("hidden");
    history.push("/");
  };

  const handleNav = () => {
    const menu = document.querySelector(".Navbar");
    menu.classList.toggle("hidden");
  };

  const closeNavbar = () => {
    const menu = document.querySelector(".Navbar");
    menu.classList.add("hidden");
  };

  return (
    <>
      <div
        className=" px-2 md:px-10 py-4 shadow-md flex justify-between"
        // style={{ background: "#091921", color: "gold" }}
      >
        <Link to="/home">CONNECTRO</Link>
        <div className="md:hidden" onClick={handleNav}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
        {user && user.token && (
          <div className="hidden md:flex gap-4 text-center">
            <Link to="/home">HOME</Link>
            <SearchModal />
            <Link to="/profile">PROFILE</Link>
            <Link to="/chat">CHAT</Link>
          </div>
        )}
        <div className="hidden md:flex gap-4">
          {!user || !user.token ? (
            <>
              <Link to="/">LOGIN</Link>
              <Link to="/signup">SIGNUP</Link>
            </>
          ) : (
            <button onClick={handleLogout}>
              LOGOUT ( {user.username.toUpperCase()} )
            </button>
          )}
        </div>
      </div>
      <nav
        className="bg-white border-2 Navbar absolute w-full hidden md:h-0
               shadow-md p-2 overflow-hidden"
      >
        {user && user.token ? (
          <>
            <Link to="/">
              <div
                className="py-2 transition ease-in duration-300"
                onClick={closeNavbar}
              >
                Home
              </div>
            </Link>
            <div className="py-2">
              <SearchModal />
            </div>
            <Link to="/profile">
              <div className="py-2" onClick={closeNavbar}>
                Profile
              </div>
            </Link>
            <Link to="/chat">
              <div className="py-2" onClick={closeNavbar}>
                Chat
              </div>
            </Link>
            <button
              to="/"
              onClick={handleLogout}
              className="py-2 w-full text-left"
            >
              Logout ( {user.username.toUpperCase()} )
            </button>
          </>
        ) : (
          <>
            <div className="py-2" onClick={closeNavbar}>
              <Link to="/">LOGIN</Link>
            </div>
            <div className="py-2">
              <Link to="/signup" onClick={closeNavbar}>
                SIGNUP
              </Link>
            </div>
          </>
        )}
      </nav>
    </>
  );
}

const mapStateToProps = (state) => {
  return { user: state.auth };
};

export default connect(mapStateToProps, { logoutUser: logoutUser })(Nav);
