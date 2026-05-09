const { validationResult, matchedData } = require("express-validator");
const authService = require("./service");
const passport = require("passport");

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

  req.login(user, (err) => {
    if (err) return next(err);
    return res.redirect("/");
  });
};

exports.getLogin = (req, res) => {
  const error = req.session.messages?.[0];
  req.session.messages = [];
  res.render("auth/login", { error });
};

exports.postLogin = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.status(400).render("auth/login", { error: info.message });
    }

    req.login(user, (err) => {
      if (err) return next(err);
      return res.redirect("/");
    });
  })(req, res, next);
};

exports.getLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    return res.redirect("/");
  });
};
