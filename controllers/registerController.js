const { validationResult } = require("express-validator");
const { validateNewUser } = require("../validators/registerValidator");
const bcrypt = require("bcryptjs");
const db = require("../prisma/queries");

exports.registerUserGet = (req, res) => {
    res.render("register");
};

exports.registerUserPost = [
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
        res.redirect("/auth/login");
    },
];
