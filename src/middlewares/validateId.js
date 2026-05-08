const { param, validationResult } = require("express-validator");
const BadRequestError = require("../errors/BadRequestError");

const validateId = [
  param("id").isInt({ gt: 0 }).toInt(),
  (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(new BadRequestError("Invalid id"));
    }
    next();
  },
];

module.exports = validateId;
