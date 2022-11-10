const express = require("express");
const { connect } = require("mongoose");
const { listen } = express();
require("dotenv").config();
const { PORT, DB_URL } = process.env;

listen(PORT, () => console.log(`server running on port ${PORT}.`));

connect(DB_URL, () => console.log("connected to db"));
