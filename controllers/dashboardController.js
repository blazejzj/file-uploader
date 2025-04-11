const db = require("../prisma/queries");

exports.getUserDashboard = async (req, res) => {
    if (req.user) {
        const folders = await db.getAllUserFolders(req.user.id);
        return res.render("dashboard", { folders });
    }
    return res.status(401).redirect("/");
};

exports.getUserProfile = (req, res) => {
    if (!req.user) {
        return res.status(401).redirect("/");
    }
    res.render("account");
};

exports.getUserPasswordChange = (req, res) => {
    if (!req.user) {
        return res.status(401).redirect("/");
    }
    res.render("updatePassword");
};

exports.getUserNameChange = (req, res) => {
    if (!req.user) {
        return res.status(401).redirect("/");
    }
    res.render("updateName");
};
