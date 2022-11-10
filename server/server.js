require("dotenv").config();

const { json } = require("express");
const routes = require("./routes/routes");
const { connect } = require("mongoose");
const { listen, use } = express();

use(json());
use(routes);

const { PORT, DB_URL } = process.env;

listen(PORT, () => console.log(`server running on port ${PORT}.`));

connect(DB_URL, () => console.log("connected to db"));
