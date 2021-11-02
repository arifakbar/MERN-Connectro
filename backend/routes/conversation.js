const express = require("express");

const router = express.Router();
const { authCheck } = require("../middlewares/auth");
const conversationController = require("../controllers/conversation");

router.post(
  "/conversation",
  [authCheck],
  conversationController.newConversation
);

router.get(
  "/conversation",
  [authCheck],
  conversationController.getUserConversation
);

router.get(
  "/conversation/:firstUserId/:secondUserId",
  [authCheck],
  conversationController.getTheirConversation
);

module.exports = router;
