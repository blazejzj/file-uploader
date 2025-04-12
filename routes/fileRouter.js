const { Router } = require("express");
const fileRouter = Router();
const fileController = require("../controllers/fileController");
const { isAuthenticated } = require("../middleware/authMiddleware");

fileRouter.get("/:fileId", isAuthenticated, fileController.fileShow);
fileRouter.post("/:fileId/delete", isAuthenticated, fileController.fileDelete);

module.exports = fileRouter;
