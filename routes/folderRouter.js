const { Router } = require("express");
const folderRouter = Router();
const folderController = require("../controllers/folderController");

folderRouter.get("/create", folderController.folderCreateGet);
folderRouter.post("/create", folderController.folderCreatePost);

// folderRouter.get("/delete/:id", folderController.folderDelete);
// folderRouter.get("/:id", folderController.folderGet);
// folderRouter.get("/update/:id", folderController.folderUpdate);

module.exports = folderRouter;
