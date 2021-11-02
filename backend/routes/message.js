const express = require("express");

const router = express.Router();
const { authCheck } = require("../middlewares/auth");
const messageController = require("../controllers/message");

router.post("/message", [authCheck], messageController.addMessage);

router.get(
  "/message/:ConversationId",
  [authCheck],
  messageController.getMessage
);

module.exports = router;
