const express = require("express");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const cors = require("cors");
const session = require("express-session");
const authRoutes = require("./routes/Auth");
const courseRoutes = require("./routes/Course");
const enrollRoutes = require("./routes/Enroll");
const userRoutes = require("./routes/User");
const resourceRoutes = require("./routes/Resource");
const payRoutes = require("./routes/Payment");
const contactRoutes = require("./routes/Contact");

const bodyParser = require("body-parser");
const cookieparser = require("cookie-parser");

dotenv.config();

const app = express();
app.use(cookieparser());
app.use(bodyParser.urlencoded({ extended: true }));
const allowedOrigins = [
  "http://localhost:3000",
  "https://admin-panel-course-managment.vercel.app",
  "https://power-bi-assured.vercel.app",
  "https://power-bi-eta.vercel.app",
  "https://coursesforcareers.tech",
];

// Configure CORS to allow requests from the allowed origins
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);
app.use(express.json());
// app.enable("trust proxy");
app.use(
  session({
    secret: process.env.ENCRYPTION_KEY,
    resave: false,
    saveUninitialized: true,
    // proxy: true,
    name: "MyCoolWebAppCookieName",
    cookie: {
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 60 * 24 * 2,
    },
  })
);

const port = process.env.PORT;

app.use("/auth", authRoutes);
app.use("/course", courseRoutes);
app.use("/enroll", enrollRoutes);
app.use("/user", userRoutes);
app.use("/resource", resourceRoutes);
app.use("/pay", payRoutes);
app.use("/contact", contactRoutes);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(9000, () => {
  console.log("app running on port, " + port);
});
