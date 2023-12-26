const express = require("express");
const dotenv = require("dotenv");
const { connectToDB } = require("./utils/database");
dotenv.config();

const app = express();

connectToDB();

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(9000, () => {
  console.log("app running on port, " + port);
});
