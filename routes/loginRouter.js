const { Router } = require("express");
const loginRouter = Router();
const loginController = require("../controllers/loginController");

loginRouter.get("/", loginController.loginGet);
loginRouter.post("/", loginController.loginPost);

module.exports = loginRouter;
