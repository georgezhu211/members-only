const { body } = require("express-validator");
const userRepository = require("../users/repository");

const validator = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .bail()
    .isLength({ min: 2, max: 20 })
    .withMessage("First name must be between 2 and 20 characters"),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .bail()
    .isLength({ min: 2, max: 20 })
    .withMessage("Last name must be between 2 and 20 characters"),
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .bail()
    .isLength({ min: 4, max: 15 })
    .withMessage("Username must be between 4 and 15 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can contain only letters, numbers, and underscores")
    .custom(async (value) => {
      const user = await userRepository.findByUsername(value);
      if (user) {
        throw new Error("Username already in use");
      }
    }),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords do not match"),
];

module.exports = validator;
