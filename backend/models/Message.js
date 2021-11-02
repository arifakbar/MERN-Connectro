const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema;

const messageSchema = new Schema(
  {
    ConversationId: { type: ObjectId, ref: "Conversation" },
    Sender: { type: ObjectId, ref: "User" },
    Text: String,
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Message", messageSchema);
