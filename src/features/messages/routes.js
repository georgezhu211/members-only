const { Router } = require("express");
const isAuthenticated = require("../../middlewares/auth");
const validateId = require("../../middlewares/validateId");
const controller = require("./controller");
const router = Router();

router.use(isAuthenticated);

router.get("/", controller.index);

router.get("/new", controller.new);
router.post("/", controller.create);

router.get("/:id", validateId, controller.show);

router.get("/:id/edit", validateId, controller.edit);
router.post("/:id/update", validateId, controller.update);

router.post("/:id/delete", validateId, controller.delete);

module.exports = router;
