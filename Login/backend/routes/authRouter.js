// External Module
const express = require("express");

const authRouter = express.Router();

// Local Module
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

authRouter.post("/register", authController.postRegister);
authRouter.post("/login", authController.postLogin);
authRouter.post("/logout", authController.postLogout);

// Protect route
authRouter.get("/me", authMiddleware, authController.getMe);

module.exports = authRouter;