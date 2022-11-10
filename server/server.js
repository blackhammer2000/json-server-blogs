require("dotenv").config();

const express = require("express");
const routes = require("./routes/routes");
const { connect } = require("mongoose");
const { listen, use } = express();

use(express.json());
use(routes)

const { PORT, DB_URL } = process.env;

listen(PORT, () => console.log(`server running on port ${PORT}.`));

connect(DB_URL, () => console.log("connected to db"));
