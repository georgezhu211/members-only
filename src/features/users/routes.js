const { Router } = require("express");
const isAuthenticated = require("../../middlewares/auth");
const {
  validateClubCode,
  validateAdminCode,
} = require("../../middlewares/validateSecret");

const controller = require("./controller");

const router = Router();

router.use(isAuthenticated);

router.get("/me", controller.show);

router.post("/me/membership", validateClubCode, controller.membership);
router.post("/me/admin", validateAdminCode, controller.admin);

module.exports = router;
