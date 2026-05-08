const { Router } = require("express");
const controller = require("./controller");
const router = Router();

router.get("/", controller.index);

router.get("/new", controller.new);
router.post("/", controller.create);

router.get("/:id", controller.show);

module.exports = router;
