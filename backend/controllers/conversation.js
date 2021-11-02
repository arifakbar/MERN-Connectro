const Conversation = require("../models/Conversation");
const User = require("../models/user");

exports.newConversation = async (req, res, next) => {
  try {
    const { senderId, recieverId } = req.body;
    const newConversation = new Conversation({
      members: [senderId, recieverId],
    });
    await newConversation.save();
    res.status(201).json({
      data: newConversation,
      message: "New conversation created successfully.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};

exports.getUserConversation = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    const conversation = await Conversation.find({
      members: { $in: [user._id] },
    });
    res.status(200).json({
      data: conversation,
      message: "Conversation fetched successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};

exports.getTheirConversation = async (req, res, next) => {
  try {
    const { firstUserId, secondUserId } = req.params;
    const conversation = await Conversation.findOne({
      members: { $all: [firstUserId, secondUserId] },
    });
    res.status(200).json({
      data: conversation,
      message: "Fetched their conversation successfully.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};
