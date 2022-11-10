const express = require("express");
// const { connect } = require("mongoose");
const { listen } = express();
const port = 6000;

listen(port, () => console.log(`server running on port ${port}.`));

// const connection = await connect("mongodb://localhost/blogs");
//  if(connection)console.log("connected to db")
