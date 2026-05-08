const { Router } = require("express");
const controller = require("./controller");
const router = Router();

router.get("/", controller.index);

router.get("/new", controller.new);
router.post("/", controller.create);

router.get("/:id", controller.show);

router.get("/:id/edit", controller.edit);
router.post("/:id/update", controller.update);

module.exports = router;
