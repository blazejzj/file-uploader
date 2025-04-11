const { body } = require("express-validator");
const db = require("../prisma/queries");
const bcrypt = require("bcryptjs");
const prisma = require("../prisma/prisma");

const alphaErr = "Name must only contain letters and -";
const nameLengthErr = "Name must be between 2 and 100 characters.";
const oldPasswordErr = "Current password is incorrect";
const samePasswordErr = "New password must be different from current password";
const tooShortPasswordErr = "Password must be at least 8 characters";
const tooLongPasswordErr = "Password cannot be longer than 100 characters";
const passwordsDontMatchErr = "Passwords do not match";

exports.validateNewName = [
    body("newName")
        .matches(/^[a-zA-ZæøåÆØÅ\s-]{2,100}$/)
        .withMessage(alphaErr)
        .isLength({ min: 2, max: 100 })
        .withMessage(nameLengthErr),
];

exports.validateNewPassword = [
    body("currentPassword").custom(async (value, { req }) => {
        const user = await db.getUserById(req.user.id);

        const isMatch = await bcrypt.compare(value, user.password);

        if (!isMatch) {
            throw new Error(oldPasswordErr);
        }

        return true;
    }),

    body("newPassword").custom(async (value, { req }) => {
        const user = await db.getUserById(req.user.id);

        const isSame = await bcrypt.compare(value, user.password);

        if (isSame) {
            throw new Error(samePasswordErr);
        }

        return true;
    }),

    body("newPassword")
        .isLength({ min: 8 })
        .withMessage(tooShortPasswordErr)
        .isLength({ max: 100 })
        .withMessage(tooLongPasswordErr),

    body("confirmPassword")
        .custom((value, { req }) => value === req.body.newPassword)
        .withMessage(passwordsDontMatchErr),
];
