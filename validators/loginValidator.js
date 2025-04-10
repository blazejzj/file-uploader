const { body } = require("express-validator");

const loginErr = "Username or password is incorrect";

exports.validateUserLogin = [
    body("username")
        .matches(/^[a-zA-Z0-9-_]{2,100}$/)
        .withMessage(loginErr)
        .isLength({ min: 2, max: 100 })
        .withMessage(loginErr),
    body("password")
        .isLength({ min: 8 })
        .withMessage(loginErr)
        .isLength({ max: 100 })
        .withMessage(loginErr),
];
