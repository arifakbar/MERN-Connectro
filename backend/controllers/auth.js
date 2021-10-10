const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWTSECRET;

exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(200).json({
        error: "Please provide all details!",
      });
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(200).json({ error: "Email address already in use!" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ ok: true, message: "User created successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Some error occured!",
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json(200).json({ error: "Please provide all details!" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(200).json({ error: "Wrong credentials" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(200).json({ mesage: "Wrong credentials" });
    }
    const token = jwt.sign({ _id: user._id }, JWT_SECRET);
    return res.status(200).json({
      data: {
        username: user.username,
        token: token,
        _id: user._id,
      },
      message: "Logged In Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Some error occured!",
    });
  }
};
