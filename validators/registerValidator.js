const { body } = require("express-validator");
const db = require("../prisma/queries");

const alphaErr = "Must only contain letters";
const nameLengthErr = "Must be between 2 and 100 letters";
const usernamePatternErr = "Must only contain letters, digits, '-' or '_'";
const usernameLengthErr = "Must be between 2 and 100 characters.";
const tooShortPasswordErr = "Must be at least 8 characters long";
const tooLongPasswordErr = "Cannot be longer than 100 characters";
const passwordsDontMatchErr = "password dont match";
const usernameAlreadyExists = "is already in use, please choose something else";

exports.validateNewUser = [
    body("name")
        .matches(/^[a-zA-ZæøåÆØÅ\s-]{2,100}$/)
        .withMessage(alphaErr)
        .isLength({ min: 2, max: 100 })
        .withMessage(nameLengthErr),
    body("username")
        .matches(/^[a-zA-Z0-9-_]{2,100}$/)
        .withMessage(usernamePatternErr)
        .isLength({ min: 2, max: 100 })
        .withMessage(usernameLengthErr)
        .custom(async (value) => {
            const exists = await db.usernameExists(value);
            if (exists) {
                throw new Error(usernameAlreadyExists);
            }
        }),
    body("password")
        .isLength({ min: 8 })
        .withMessage(tooShortPasswordErr)
        .isLength({ max: 100 })
        .withMessage(tooLongPasswordErr),
    body("confirmPassword")
        .custom((value, { req }) => value === req.body.password)
        .withMessage(passwordsDontMatchErr),
];
