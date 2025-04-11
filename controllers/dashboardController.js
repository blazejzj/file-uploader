const db = require("../prisma/queries");

exports.getUserDashboard = async (req, res) => {
    if (req.user) {
        const folders = await db.getAllUserFolders(req.user.id);
        return res.render("dashboard", { folders });
    }
    return res.status(401).redirect("/");
};
