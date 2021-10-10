const User = require("../models/user");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWTSECRET;

exports.authCheck = (req, res, next) => {
  try {
    const { authtoken } = req.headers;
    if (!authtoken) {
      return res.status(401).json({
        error: "Invalid or expired token!",
      });
    }
    const token = authtoken.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET, async (err, payload) => {
      if (err) {
        return res.status(401).json({
          error: "Invalid or expired token!",
        });
      }
      const { _id } = payload;
      await User.findById({ _id }).then((userData) => {
        req.user = userData;
        next();
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Some error occured!",
    });
  }
};
