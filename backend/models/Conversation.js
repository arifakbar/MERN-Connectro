const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema;

const conversationSchema = new Schema(
  {
    members: Array,
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Converation", conversationSchema);
