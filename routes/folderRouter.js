const { Router } = require("express");
const folderRouter = Router();
const folderController = require("../controllers/folderController");
const fileController = require("../controllers/fileController");
const { isAuthenticated } = require("../middleware/authMiddleware");

folderRouter.get("/", isAuthenticated, folderController.foldersShow);
folderRouter.get("/create", isAuthenticated, folderController.folderCreateGet);
folderRouter.post(
    "/create",
    isAuthenticated,
    folderController.folderCreatePost
);
folderRouter.post(
    "/delete/:id",
    isAuthenticated,
    folderController.folderDelete
);
folderRouter.get(
    "/update/:id",
    isAuthenticated,
    folderController.folderUpdateGet
);
folderRouter.post(
    "/update/:id",
    isAuthenticated,
    folderController.folderUpdatePost
);
folderRouter.get("/:id", isAuthenticated, folderController.folderGet);

folderRouter.get(
    "/:folderId/file/create",
    isAuthenticated,
    fileController.fileCreateGet
);
folderRouter.post(
    "/:folderId/file/create",
    isAuthenticated,
    fileController.fileCreatePost
);

module.exports = folderRouter;
