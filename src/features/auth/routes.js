const { Router } = require("express");
const controller = require("./controller");
const passport = require("passport");

const router = Router();

router.get("/signup", controller.getSignup);

router.post("/signup", controller.postSignup);

router.get("/login", controller.getLogin);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

module.exports = router;
