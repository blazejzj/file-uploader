const { validateUserLogin } = require("../validators/loginValidator");
const { validationResult } = require("express-validator");

exports.loginGet = (req, res) => {
    res.render("login");
};

exports.loginPost = [
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
