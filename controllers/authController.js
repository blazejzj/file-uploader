const { validationResult } = require("express-validator");
const { validateUserLogin } = require("../validators/loginValidator");
const { validateNewUser } = require("../validators/registerValidator");
const bcrypt = require("bcryptjs");
const db = require("../prisma/queries");

exports.showLoginForm = (req, res) => {
    res.render("login");
};

exports.login = [
    validateUserLogin,
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = errors.array().map((err) => err.msg);

            return res.render("login", {
                errors: formattedErrors,
            });
        }

        res.redirect("/");
    },
];

exports.showRegisterForm = (req, res) => {
    res.render("register");
};

exports.register = [
    validateNewUser,
    async (req, res) => {
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
        res.redirect("/login");
    },
];
