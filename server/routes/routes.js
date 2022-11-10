const router = require("express").Router();

const get_routes = require("./get_routes");
const post_routes = require("./post_routes");
const patch_routes = require("./patch_routes");
const delete_routes = require("./delete_routes");

router.use(get_routes);
router.use(post_routes);
router.use(patch_routes);
router.use(delete_routes);

module.exports = router;
