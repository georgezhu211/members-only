const { Router } = require("express");

const controller = require("./controller");

const router = Router();

router.get("/signup", controller.getSignup);

module.exports = router;
