const { Router } = require("express");
const controller = require("./controller");
const passport = require("passport");
const validateUser = require("./validator");

const router = Router();

router.get("/signup", controller.getSignup);

router.post("/signup", validateUser, controller.postSignup);

router.get("/login", controller.getLogin);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

router.get("/logout", controller.getLogout);

module.exports = router;
