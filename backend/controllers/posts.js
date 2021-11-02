const Post = require("../models/posts");
const User = require("../models/user");

exports.getAllPosts = async (req, res, next) => {
  const { number } = req.params;
  try {
    console.log("N ", number);
    const posts = await Post.find()
      .populate("comments.commentedBy", "_id username")
      .populate("postedBy", "_id username")
      .sort({ createdAt: -1 })
      .limit(parseInt(number));
    res.status(200).json({
      data: posts,
      message: "Posts fetched successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Some error occured!",
    });
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    const { title, content, image } = req.body;
    if (!title || !content || !image) {
      return res.status(422).json({ error: "Please provide all details" });
    }
    const newPost = new Post({
      title: title,
      content: content,
      image: image,
      postedBy: user._id,
    });
    await newPost.save();
    res.status(201).json({
      message: "Post created successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Some error occured!",
    });
  }
};

exports.UserPosts = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    const post = await Post.find({ postedBy: user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      data: post,
      message: "User posts fetched successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Some error occured!",
    });
  }
};

exports.deleteUserPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const user = await User.findOne({ email: req.user.email });
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found!",
      });
    }
    if (post.postedBy.toString() !== user._id.toString()) {
      return res.status(401).json({
        message: "Authorization error",
      });
    }
    await post.remove();
    res.status(200).json({
      ok: true,
      message: "Post deleted successfully!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Some error occured!",
    });
  }
};

exports.likePost = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const { action } = req.body;
    if (action === "like") {
      await Post.findByIdAndUpdate(
        postId,
        {
          $push: { likes: req.user._id },
          $pull: { dislikes: req.user._id },
        },
        { new: true }
      );
      res.status(201).json({ message: "Post liked." });
    } else if (action === "unlike") {
      await Post.findByIdAndUpdate(
        postId,
        {
          $pull: { likes: req.user._id },
        },
        { new: true }
      );
      res.status(201).json({ message: "Post unliked." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured." });
  }
};

exports.dislikePost = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const { action } = req.body;
    if (action === "dislike") {
      await Post.findByIdAndUpdate(
        postId,
        {
          $push: { dislikes: req.user._id },
          $pull: { likes: req.user._id },
        },
        { new: true }
      );
      res.status(201).json({ message: "Post unliked." });
    } else if (action === "undislike") {
      await Post.findByIdAndUpdate(
        postId,
        {
          $pull: { dislikes: req.user._id },
        },
        { new: true }
      );
      res.status(201).json({ message: "Post unliked." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured." });
  }
};

exports.AddComments = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const { text } = req.body;
    const comment = { text: text, commentedBy: req.user._id };
    await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: comment } },
      { new: true }
    );
    res.status(201).json({ message: "Commented successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};
