const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();

dotenv.config({ path: "./config.env" });

//database connection
require("./db/dbconn");

app.use(express.json());

// link router file
app.use(require("./router/auth"));

app.get("/", (req, res) => {
  res.send("Hello from node server");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
