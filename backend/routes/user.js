const express = require("express");

const router = express.Router();

const { authCheck } = require("../middlewares/auth");
const userController = require("../controllers/user");

router.get(
  "/current-user-profile",
  [authCheck],
  userController.currentUserProfile
);

router.get("/certain-user-profile", userController.certainUserProfile);

router.post(
  "/change-profile-pic",
  [authCheck],
  userController.changeUserProfilePic
);

router.get("/user/:userId", userController.userById);

router.get("/user-populated/:userId", userController.populatedUserById);

router.put("/user/follow", [authCheck], userController.follow);

router.post("/user/search", userController.searchUser);

module.exports = router;
