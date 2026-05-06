const authService = require("./service");

exports.getSignup = (req, res) => {
  res.render("auth/signup");
};

exports.postSignup = async (req, res) => {
  const user = await authService.createUser(req.body);

  res.status(201).json({
    message: "User created",
    user,
  });
};

exports.getLogin = (req, res) => {
  res.render("auth/login");
};
