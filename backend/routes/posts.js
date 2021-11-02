const express = require("express");
const router = express.Router();

const { authCheck } = require("../middlewares/auth");

const postsController = require("../controllers/posts");

router.get("/posts/:number", postsController.getAllPosts);

router.post("/posts", [authCheck], postsController.createPost);

// router.get("/userPosts", [authCheck], postsController.UserPosts);
router.get("/userPosts/:userId", postsController.UserPosts);

router.delete("/post/:postId", [authCheck], postsController.deleteUserPost);

router.put("/like-post/:postId", [authCheck], postsController.likePost);

router.put("/dislike-post/:postId", [authCheck], postsController.dislikePost);

router.put("/add-comment/:postId", [authCheck], postsController.AddComments);

module.exports = router;
