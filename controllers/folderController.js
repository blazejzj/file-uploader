const db = require("../prisma/queries");
const { validationResult } = require("express-validator");
const { validateNewFolder } = require("../validators/folderValidator");

exports.folderCreateGet = (req, res) => {
    if (!req.user) {
        return res.status(400).redirect("/");
    }

    res.render("folderCreate");
};

exports.folderCreatePost = [
    validateNewFolder,
    async (req, res) => {
        if (!req.user) {
            return res.status(400).redirect("/");
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = errors.array().map((error) => error.msg);
            return res
                .status(400)
                .render("folderCreate", { errors: formattedErrors });
        }

        const folderName = req.body.foldername;
        const userId = req.user.id;

        await db.createNewFolder(folderName, userId);

        res.redirect("/dashboard");
    },
];

exports.foldersShow = async (req, res) => {
    if (req.user) {
        const folders = await db.getAllUserFolders(req.user.id);
        return res.render("dashboard", { folders });
    }
    return res.status(401).redirect("/");
};

exports.folderDelete = async (req, res) => {
    if (!req.user) {
        return res.status(401).redirect("/");
    }

    const folderId = Number(req.params.id);

    const userOwns = await db.userOwnsFolder(req.user.id, folderId);

    if (!userOwns) {
        return res.status(401).redirect("/");
    }

    await db.deleteFolder(folderId);

    res.redirect("/dashboard");
};

exports.folderUpdateGet = async (req, res) => {
    if (!req.user) {
        return res.status(401).redirect("/");
    }
    const folderId = Number(req.params.id);
    const userId = Number(req.user.id);

    const userOwnsFolder = await db.isUserFolderOwner(userId, folderId);
    if (!userOwnsFolder) {
        return res.status(401).redirect("/dashboard");
    }

    const folder = await db.getFolderById(folderId);

    return res.render("folderUpdate", { folder });
};

exports.folderUpdatePost = [
    validateNewFolder,
    async (req, res) => {
        if (!req.user) {
            return res.status(401).redirect("/");
        }

        // check if updated folder belongs to user
        const folderId = Number(req.params.id);
        const userId = Number(req.user.id);
        let userOwnsFolder = await db.isUserFolderOwner(userId, folderId);
        if (!userOwnsFolder) {
            return res.status(401).redirect("/dashboard");
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = errors.array().map((error) => error.msg);
            return res
                .status(400)
                .render("folderCreate", { errors: formattedErrors });
        }

        // update folder
        const newName = req.body.newFoldername;
        await db.updateFolderName(folderId, newName);
        res.redirect("/dashboard");
    },
];
