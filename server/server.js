const express = require("express");
const { listen } = express();
const port = 6000;

listen(port, () => console.log(`server running on port ${port}.`));
