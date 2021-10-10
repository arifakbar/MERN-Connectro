import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import axios from "axios";

import history from "../../history";
import { createPost } from "../../functions/posts";

function CreatePost(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [src, setSrc] = useState(null);
  const [imgId, setImgId] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = props;

  const ImageUploadAndResize = (e) => {
    let files = e.target.files;
    setLoading(true);
    if (files) {
      try {
        Resizer.imageFileResizer(
          files[0],
          720,
          720,
          "jpeg",
          100,
          0,
          (uri) => {
            return axios
              .post(
                process.env.REACT_APP_API + "uploadImage",
                {
                  image: uri,
                },
                { headers: { authToken: user.token } }
              )
              .then((res) => {
                setSrc(res.data.data.url);
                setImgId(res.data.data.public_id);
                setLoading(false);
              });
          },
          "base64"
        );
        toast.success("Image uploaded successfully. Wait for it to appear.");
      } catch (err) {
        console.log(err);
        setLoading(false);
        toast.error(err.message);
      }
    }
  };

  const handleImageDelete = async (id) => {
    setLoading(true);
    try {
      await axios.post(
        process.env.REACT_APP_API + "deleteImage",
        {
          public_id: id,
        },
        { headers: { authToken: user.token } }
      );
      setSrc(null);
      setImgId(null);
      setLoading(false);
      toast.success("Image removed sucessfully. Please choose another.");
      // window.location.reload();
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createPost(user.token, title, content, src);
      toast.success("Post created successfully.");
      history.push("/home");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div>
      <form
        className="center-form border-2 p-10 shadow-xl"
        onSubmit={handleSubmit}
      >
        <h1 className="center-h1">New Post</h1>
        <div className="form-div">
          <label>Title</label>
          <input
            type="text"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            minLength="2"
            maxLength="30"
            required
          />
        </div>
        <div className="form-div">
          <label>Description</label>
          <input
            type="text"
            className="form-input"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            minLength="2"
            maxLength="30"
            required
          />
        </div>
        <div className="form-div">
          <label>Image</label>
          <li className="relative" style={{ listStyle: "none" }}>
            <div
              className=" cursor-pointer top-0 border-2 p-2 text-center"
              style={{ zIndex: -1 }}
            >
              UPLOAD
            </div>
            <input
              type="file"
              accept="images/*"
              className="image-input absolute top-0 opacity-0 cursor-pointer"
              onChange={(e) => ImageUploadAndResize(e)}
              required
            />
            {loading ? (
              <div className="text-center p-2">Loading...</div>
            ) : (
              <>
                <div
                  className="overflow-hidden my-2 w-full "
                  style={{ height: src ? "120px" : "0px" }}
                >
                  <img
                    src={src}
                    className="w-full h-full object-contain"
                    alt="NF"
                  />
                </div>
                {src && (
                  <div
                    className="w-full py-1 bg-red-500 text-white text-center cursor-pointer"
                    onClick={() => handleImageDelete(imgId)}
                  >
                    Remove Image
                  </div>
                )}
              </>
            )}
          </li>
        </div>
        <button className="py-1 px-4 my-2 w-full bg-green-500 text-white">
          Add
        </button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { user: state.auth };
};

export default connect(mapStateToProps)(CreatePost);
