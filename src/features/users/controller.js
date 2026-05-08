exports.show = async (req, res) => {
  res.render("users/show", { user: req.user });
};
