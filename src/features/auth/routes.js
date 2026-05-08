const { Router } = require("express");
const controller = require("./controller");
const validateUser = require("./validator");

const router = Router();

router.get("/signup", controller.getSignup);

router.post("/signup", validateUser, controller.postSignup);

router.get("/login", controller.getLogin);

router.post("/login", controller.postLogin);

router.get("/logout", controller.getLogout);

module.exports = router;
