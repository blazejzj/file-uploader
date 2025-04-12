function isAuthenticated(req, res, next) {
    if (req.isAuthenticated) {
        return next();
    }

    if (req.user) {
        return res.redirect("/dashboard");
    }

    res.redirect("/auth/login");
}

function isGuest(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/dashboard");
    }
    next();
}

module.exports = { isAuthenticated, isGuest };
