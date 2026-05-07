const { Router } = require("express");
const controller = require("./controller");
const router = Router();

router.get("/new", controller.new);
router.post("/", controller.create);

module.exports = router;
