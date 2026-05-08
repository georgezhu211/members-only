const { Router } = require("express");
const isAuthenticated = require("../../middlewares/auth");
const validateSecret = require("../../middlewares/validateSecret");

const controller = require("./controller");

const router = Router();

router.use(isAuthenticated);

router.get("/me", controller.show);

router.post("/me/membership", validateSecret, controller.membership);

module.exports = router;
