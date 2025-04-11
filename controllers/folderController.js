const db = require("../prisma/queries");

exports.folderCreateGet = (req, res) => {
    if (!req.user) {
        return res.status(400).redirect("/");
    }

    res.render("folderCreate");
};

exports.folderCreatePost = async (req, res) => {
    if (!req.user) {
        return res.status(400).redirect("/");
    }

    const folderName = req.body.foldername;
    const userId = req.user.id;

    await db.createNewFolder(folderName, userId);

    res.redirect("/dashboard");
};
