const { body } = require("express-validator");

const folderNameErr = "Folder name can't include unusual characters";
const folderNameLengthErr = "Folder name must be between 1 and 100 characters";

exports.validateNewFolder = [
    body("foldername")
        .isLength({ min: 1, max: 100 })
        .withMessage(folderNameLengthErr)
        .matches(/^(?!.* {2})[a-zA-Z0-9æøåÆØÅ _-]{1,100}$/)
        .withMessage(folderNameErr),
];
