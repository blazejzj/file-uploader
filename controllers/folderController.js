const db = require("../prisma/queries");
const { validationResult } = require("express-validator");
const { validateNewFolder } = require("../validators/folderValidator");

async function ownsFolder(userId, folderId) {
    return await db.userOwnsFolder(userId, folderId);
}

exports.folderCreateGet = (req, res) => {
    res.render("folderCreate");
};

exports.folderCreatePost = [
    validateNewFolder,
    async (req, res) => {
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
    const folders = await db.getAllUserFolders(req.user.id);
    return res.render("dashboard", { folders });
};

exports.folderDelete = async (req, res) => {
    const folderId = Number(req.params.id);

    if (!(await ownsFolder(req.user.id, folderId))) {
        return res.status(401).redirect("/");
    }

    await db.deleteFolder(folderId);
    res.redirect("/dashboard");
};

exports.folderUpdateGet = async (req, res) => {
    const folderId = Number(req.params.id);

    if (!(await ownsFolder(req.user.id, folderId))) {
        return res.status(401).redirect("/dashboard");
    }

    const folder = await db.getFolderById(folderId);
    res.render("folderUpdate", { folder });
};

async function ownsFolder(userId, folderId) {
    let userOwnsFolder = await db.isUserFolderOwner(userId, folderId);
    if (!userOwnsFolder) {
        return false;
    }
    return true;
}

exports.folderUpdatePost = [
    validateNewFolder,
    async (req, res) => {
        const folderId = Number(req.params.id);

        if (!(await ownsFolder(req.user.id, folderId))) {
            return res.status(401).redirect("/dashboard");
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = errors.array().map((error) => error.msg);
            return res
                .status(400)
                .render("folderUpdate", { errors: formattedErrors });
        }

        const newName = req.body.newFoldername;
        await db.updateFolderName(folderId, newName);
        res.redirect("/dashboard");
    },
];

exports.folderGet = async (req, res) => {
    const folderId = Number(req.params.id);

    if (!(await db.userOwnsFolder(req.user.id, folderId))) {
        return res.status(401).redirect("/dashboard");
    }

    const folder = await db.getFolderById(folderId);
    const files = await db.getFilesByFolderId(folderId);

    res.render("folder", {
        folder,
        files,
    });
};
