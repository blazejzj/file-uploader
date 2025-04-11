const { validationResult } = require("express-validator");
const { validateUserLogin } = require("../validators/loginValidator");
const { validateNewUser } = require("../validators/registerValidator");
const bcrypt = require("bcryptjs");
const db = require("../prisma/queries");
const passport = require("passport");

exports.showLoginForm = (req, res) => {
    if (req.user) {
        return res.redirect("/dashboard");
    }
    res.render("login");
};

exports.login = [
    validateUserLogin,
    (req, res, next) => {
        if (req.user) {
            return res.redirect("/dashboard");
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = errors.array().map((err) => err.msg);

            return res.render("login", {
                errors: formattedErrors,
            });
        }

        passport.authenticate("local", {
            successRedirect: `/dashboard`,
            failureRedirect: `/auth/login`,
        })(req, res, next);
    },
];

exports.showRegisterForm = (req, res) => {
    if (req.user) {
        return res.redirect("/dashboard");
    }
    res.render("register");
};

exports.register = [
    validateNewUser,
    async (req, res) => {
        if (req.user) {
            return res.redirect("/dashboard");
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = errors.array().map((err) => err.msg);

            return res.render("register", {
                errors: formattedErrors,
            });
        }

        const { name, username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.addNewUser(name, username, hashedPassword);
        res.redirect("/auth/login");
    },
];

exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect("/");
    });
};
