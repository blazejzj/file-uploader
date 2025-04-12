const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");
const { isGuest } = require("../middleware/authMiddleware");

authRouter.get("/register", isGuest, authController.showRegisterForm);
authRouter.post("/register", isGuest, authController.register);

authRouter.get("/login", isGuest, authController.showLoginForm);
authRouter.post("/login", isGuest, authController.login);

authRouter.get("/logout", authController.logout);

module.exports = authRouter;
