const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect("mongodb://localhost:27017/job-finder", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => {
    console.log("Databse connection failed!");
  });

app.get("/", (req, res) => {
  res.send("Hello from node server");
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
