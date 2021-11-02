const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 8000;
const DATABASE = process.env.DATABASE;

const authRoutes = require("./routes/auth");
const postsRoutes = require("./routes/posts");
const cloudinaryRoutes = require("./routes/cloudinary");
const userRoutes = require("./routes/user");
const messageRoutes = require("./routes/message");
const conversationRoutes = require("./routes/Conversation");

const app = express();

mongoose
  .connect(DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("DB connection error: " + err));

app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

app.use("/api", authRoutes);
app.use("/api", postsRoutes);
app.use("/api", cloudinaryRoutes);
app.use("/api", userRoutes);
app.use("/api", messageRoutes);
app.use("/api", conversationRoutes);

app.listen(PORT, () => {
  console.log("Server running on port: ", PORT);
});
