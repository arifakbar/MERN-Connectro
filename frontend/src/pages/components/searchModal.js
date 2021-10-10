import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import { searchUser } from "../../functions/user";
import history from "../../history";

export default function SearchModal() {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [text, setText] = useState("");

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
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const handleClick = (e, id) => {
    e.preventDefault();
    setShowModal(false);
    setUsers([]);
    setText("");
    history.push(`/user/${id}`);
  };

  return (
    <>
      <button type="button" onClick={() => setShowModal(true)}>
        SEARCH
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <h1 className="pt-4 text-xl font-semibold uppercase">Search</h1>
                <form className="px-4 pt-10 pb-5 w-full">
                  <input
                    type="text"
                    className="border-b-2 w-full px-4"
                    placeholder="Enter username"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </form>
                <hr />
                <div className="relative p-6 flex-column list-none max-h-96 overflow-y-auto">
                  {users &&
                    users.map((u) => {
                      return (
                        <Link
                          // to={`/user/${u._id}`}
                          key={u._id}
                          onClick={(e) => handleClick(e, u._id)}
                        >
                          <li className="text-left p-1 border-2 my-1">
                            {u.username}
                          </li>
                        </Link>
                      );
                    })}
                </div>
                <div className="flex items-center justify-end p-2 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 border-2 rounded-md p-2 shadow-md"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
