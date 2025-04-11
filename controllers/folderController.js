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
            res.status(400).render("folderCreate", { errors: formattedErrors });
        }

        const folderName = req.body.foldername;
        const userId = req.user.id;

        await db.createNewFolder(folderName, userId);

        res.redirect("/dashboard");
    },
];
