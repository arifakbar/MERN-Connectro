const express = require("express");

const router = express.Router();

const { authCheck } = require("../middlewares/auth");
const cloudinaryController = require("../controllers/cloudinary");

router.post("/uploadImage", [authCheck], cloudinaryController.uploadImage);

router.post("/deleteImage", [authCheck], cloudinaryController.deleteImage);

module.exports = router;
