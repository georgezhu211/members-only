const { body } = require("express-validator");

const validator = [
  body("secretPasscode")
    .equals(process.env.SECRET_PASSCODE)
    .withMessage("Wrong passcode!"),
];

module.exports = validator;
