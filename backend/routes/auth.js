const express = require("express");

const router = express.Router();

const { authCheck } = require("../middlewares/auth");

const userController = require("../controllers/auth");

router.post("/signup", userController.signup);

router.post("/login", userController.login);

router.get("/dummy", [authCheck], (req, res) => {
  res.send("Yo");
});

module.exports = router;
