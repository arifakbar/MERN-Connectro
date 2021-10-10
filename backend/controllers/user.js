const User = require("../models/user");

exports.currentUserProfile = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    res.status(200).json({ data: user, message: "Fetched user successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured." });
  }
};

exports.certainUserProfile = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    res.status(200).json({ data: user, message: "Fetched user successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured." });
  }
};

exports.changeUserProfilePic = async (req, res, next) => {
  const { profilePic } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { email: req.user.email },
      { profilePic: profilePic },
      { new: true }
    );
    res
      .status(201)
      .json({ data: user, message: "Profile pic updated successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured." });
  }
};

exports.userById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    res.status(200).json({ data: user, message: "Fetched user successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occuerd" });
  }
};

exports.populatedUserById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId)
      .populate("followers")
      .populate("following");
    res.status(200).json({ data: user, message: "Fetched user successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};

exports.follow = async (req, res, next) => {
  const { action, otherUserId } = req.body;
  try {
    if (action === "follow") {
      await User.findOneAndUpdate(
        { email: req.user.email },
        {
          $push: { following: otherUserId },
        },
        { new: true }
      );
      await User.findByIdAndUpdate(
        otherUserId,
        {
          $push: { followers: req.user._id },
        },
        { new: true }
      );
      res.status(201).json({ ok: true, message: "Followed successfully" });
    } else if (action === "unfollow") {
      await User.findOneAndUpdate(
        { email: req.user.email },
        {
          $pull: { following: otherUserId },
        },
        { new: true }
      );
      await User.findByIdAndUpdate(
        otherUserId,
        {
          $pull: { followers: req.user._id },
        },
        { new: true }
      );
      res.status(201).json({ ok: true, message: "Unfollowed successfully" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};

exports.searchUser = async (req, res, next) => {
  const { query } = req.body;
  try {
    const users = await User.find({
      $or: [{ username: new RegExp(query, "i") }],
      // $text: { $search: query },
    })
      .select("_id username profilePic")
      .limit(20)
      .sort({ createdAt: -1 });
    res
      .status(200)
      .json({ data: users, message: "Users fetched successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};
