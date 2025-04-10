const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");

authRouter.get("/register", authController.showRegisterForm);
authRouter.post("/register", authController.register);

authRouter.get("/login", authController.showLoginForm);
authRouter.post("/login", authController.login);

authRouter.post("/logout", authController.logout);

module.exports = authRouter;
