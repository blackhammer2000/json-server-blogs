const { use } = require("express").Router();
require("dotenv").config();

const get_routes = require("./get_routes");
const post_routes = require("./post_routes");
const patch_routes = require("./patch_routes");
const delete_routes = require("./delete_routes");

use(get_routes);
use(post_routes);
use(patch_routes);
use(delete_routes);

module.exports = router;
