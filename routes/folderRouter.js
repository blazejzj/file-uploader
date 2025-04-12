const { Router } = require("express");
const folderRouter = Router();
const folderController = require("../controllers/folderController");

folderRouter.get("/", folderController.foldersShow);

folderRouter.get("/create", folderController.folderCreateGet);
folderRouter.post("/create", folderController.folderCreatePost);

folderRouter.post("/delete/:id", folderController.folderDelete);
folderRouter.get("/update/:id", folderController.folderUpdateGet);
folderRouter.post("/update/:id", folderController.folderUpdatePost);

folderRouter.get("/:id", folderController.folderGet);

module.exports = folderRouter;
