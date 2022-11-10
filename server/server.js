const express = require("express");
const { connect } = require("mongoose");
const { listen } = express();
const port = 6000;

listen(port, () => console.log(`server running on port ${port}.`));

connect("mongodb://localhost/blogs", () => console.log("connected to db"));
