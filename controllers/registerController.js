const { validateNewUser } = require("../validators/registerValidator");
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

exports.registerUserGet = (req, res) => {
    res.render("register");
};

exports.registerUserPost = [
    validateNewUser,
    (req, res) => {
        const { name, username, password } = req.body;
        const hashedPassword = bcrypt.hash(password);
    },
];
