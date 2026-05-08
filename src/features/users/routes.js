const { Router } = require("express");
const isAuthenticated = require("../../middlewares/auth");
const controller = require("./controller");

const router = Router();

router.use(isAuthenticated);

router.get("/me", controller.show);

module.exports = router;
