const express = require("express");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const session = require("express-session");
const authRoutes = require("./routes/Auth");
const courseRoutes = require("./routes/Course");
const { connectToDB } = require("./utils/database");
dotenv.config();

const app = express();
app.use(express.json());
app.use(
  session({
    secret: process.env.ENCRYPTION_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

const port = process.env.PORT;

app.use("/auth", authRoutes);
app.use("/course", courseRoutes);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(9000, () => {
  console.log("app running on port, " + port);
});
