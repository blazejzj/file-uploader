const { Router } = require("express");
const registerRouter = Router();
const registerController = require("../controllers/registerController");

registerRouter.get("/", registerController.registerUserGet);
registerRouter.post("/", registerController.registerUserPost);

module.exports = registerRouter;
