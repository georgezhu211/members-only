const { validationResult, matchedData } = require("express-validator");
const authService = require("./service");

exports.getSignup = (req, res) => {
  res.render("auth/signup");
};

exports.postSignup = async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).render("auth/signup", {
      errors: result.array(),
    });
  }

  const data = matchedData(req);
  const user = await authService.createUser(data);

  res.redirect("/");
};

exports.getLogin = (req, res) => {
  res.render("auth/login");
};

exports.getLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
