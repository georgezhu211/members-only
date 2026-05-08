const { Router } = require("express");
const isAuthenticated = require("../../middlewares/auth");
const controller = require("./controller");
const router = Router();

router.use(isAuthenticated);

router.get("/", controller.index);

router.get("/new", controller.new);
router.post("/", controller.create);

router.get("/:id", controller.show);

router.get("/:id/edit", controller.edit);
router.post("/:id/update", controller.update);

router.post("/:id/delete", controller.delete);

module.exports = router;
