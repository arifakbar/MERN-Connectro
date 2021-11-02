const Message = require("../models/Message");

exports.addMessage = async (req, res, next) => {
  try {
    console.log(req.body);
    const newMsg = new Message(req.body);
    await newMsg.save();
    res
      .status(201)
      .json({ data: newMsg, message: "Message created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Some error occured" });
  }
};

exports.getMessage = async (req, res, next) => {
  try {
    const { ConversationId } = req.params;
    const Msg = await Message.find({ ConversationId: ConversationId });
    res
      .status(200)
      .json({ data: Msg, message: "Messages fetched successfully" });
  } catch (err) {
    console.log(err);
    res.sattus(500).json({ err: "Some error cocured" });
  }
};
