require("dotenv").config();

const express = require("express");
const routes = require("");
const { connect } = require("mongoose");
const { listen } = express();

const { PORT, DB_URL } = process.env;

listen(PORT, () => console.log(`server running on port ${PORT}.`));

connect(DB_URL, () => console.log("connected to db"));
