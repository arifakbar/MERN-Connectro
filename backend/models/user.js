const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const { ObjectId } = Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    text: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: { type: Object },
  followers: [{ type: ObjectId, ref: "User" }],
  following: [{ type: ObjectId, ref: "User" }],
});

module.exports = mongoose.model("User", userSchema);
