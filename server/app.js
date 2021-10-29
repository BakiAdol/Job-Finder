const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const app = express();

dotenv.config({ path: "./config.env" });

//database connection
require("./db/dbconn");

app.use(express.json());
app.use(cookieParser());

// link router file
app.use(require("./router/router"));

app.get("/", (req, res) => {
  res.send("Hello from node server");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
