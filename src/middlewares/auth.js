function isAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).redirect("/auth/login");
  }
  next();
}

module.exports = isAuthenticated;
