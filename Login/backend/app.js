// External Module
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const cors = require("cors");

// Local Module
const connectDB = require("./config/db");
const authRouter = require("./routes/authRouter");
const protectedRoutes = require("./routes/protectedRoutes");

const app = express();

app.use(express.urlencoded());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json());

const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
  expires: 1000 * 60 * 60 * 24
});

app.use(session({
  name: "mern.sid",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: store,

  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24
  }
}));

app.use("/api/auth", authRouter);
app.use("/api", protectedRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});