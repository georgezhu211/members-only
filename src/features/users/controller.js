const { validationResult } = require("express-validator");
const userRepository = require("../users/repository");

exports.show = async (req, res) => {
  res.render("users/show", { user: req.user });
};

exports.membership = async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).render("users/show", {
      errors: result.array(),
    });
  }

  await userRepository.joinTheClub(req.user.id);
  res.redirect("/users/me");
};

exports.admin = async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).render("users/show", {
      errors: result.array(),
    });
  }

  await userRepository.grantAdminAccess(req.user.id);
  res.redirect("/users/me");
};
