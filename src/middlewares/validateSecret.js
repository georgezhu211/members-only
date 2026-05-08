const { body } = require("express-validator");

const validator = [
  body("secretPasscode").equals("kamehameha").withMessage("Wrong passcode!"),
];

module.exports = validator;
