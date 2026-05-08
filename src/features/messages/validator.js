const { body } = require("express-validator");

const validator = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 17 })
    .withMessage("Title must be 17 characters or less"),
  body("content")
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ max: 280 })
    .withMessage("Message must be 280 characters or less"),
];

module.exports = validator;
