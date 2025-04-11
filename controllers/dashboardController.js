const db = require("../prisma/queries");
const {
    validateNewName,
    validateNewPassword,
} = require("../validators/userUpdateValidator");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

exports.getUserDashboard = async (req, res) => {
    if (!req.user) {
        return res.status(401).redirect("/");
    }

    const folders = await db.getAllUserFolders(req.user.id);

    return res.render("dashboard", {
        user: req.user,
        folders,
    });
};

exports.getUserProfile = (req, res) => {
    if (!req.user) {
        return res.status(401).redirect("/");
    }

    return res.render("account", {
        user: req.user,
    });
};

exports.getUserPasswordChange = (req, res) => {
    if (!req.user) {
        return res.status(401).redirect("/");
    }

    return res.render("updatePassword", {
        user: req.user,
    });
};

exports.getUserNameChange = (req, res) => {
    if (!req.user) {
        return res.status(401).redirect("/");
    }

    return res.render("updateName", {
        user: req.user,
    });
};

exports.changeUserName = async (req, res) => {
    if (!req.user) {
        return res.status(401).redirect("/");
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map((err) => err.msg);
        return res.render("updateName", {
            user: req.user,
            errors: formattedErrors,
        });
    }

    const newName = req.body.newName;

    await db.updateUserName(req.user.id, newName);

    res.redirect("/dashboard/account");
};

exports.changeUserPw = async (req, res) => {
    if (!req.user) {
        return res.status(401).redirect("/");
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map((err) => err.msg);
        return res.render("updatePassword", {
            user: req.user,
            errors: formattedErrors,
        });
    }

    const newPassword = req.body.newPassword;
    const hashedPw = await bcrypt.hash(newPassword, 10);

    await db.updateUserPassword(req.user.id, hashedPw);

    res.redirect("/dashboard/account");
};
