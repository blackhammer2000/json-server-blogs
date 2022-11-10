require("dotenv").config();

const express = require("express");
const routes = require("./routes/routes");
const { connect } = require("mongoose");
const app = express();

app.use(express.json());
app.use(routes);

const { PORT, DB_URL } = process.env;

app.listen(PORT, () => console.log(`server running on port ${PORT}.`));

connect(DB_URL, () => console.log("connected to db"));
