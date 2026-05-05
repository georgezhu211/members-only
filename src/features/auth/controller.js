exports.getSignup = (req, res) => {
  res.render("auth/signup");
};

exports.postSignup = (req, res) => {
  res.send(req.body);
};
