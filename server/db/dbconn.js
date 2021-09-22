const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => {
    console.log("Databse connection failed!");
  });
