exports.getUserDashboard = (req, res) => {
    if (req.user) {
        return res.render("dashboard");
    }
    return res.status(401).redirect("/");
};
