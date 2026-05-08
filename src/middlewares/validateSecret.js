const { body } = require("express-validator");

const validateClubCode = [
  body("clubPasscode")
    .equals(process.env.CLUB_PASSCODE)
    .withMessage("Wrong passcode!"),
];

const validateAdminCode = [
  body("adminPasscode")
    .equals(process.env.ADMIN_PASSCODE)
    .withMessage("Wrong passcode!"),
];

module.exports = {
  validateClubCode,
  validateAdminCode,
};
