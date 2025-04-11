const { Router } = require("express");
const indexRouter = Router();

indexRouter.get("/", (req, res) => {
    if (!req.user) {
        return res.render("index");
    }
    return res.redirect("/dashboard");
});

module.exports = indexRouter;
