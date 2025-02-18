const mongoose = require("mongoose");
const db_url = process.env.DB_URL;
mongoose
  .connect(db_url)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log("error in connecting to mongodb", err);
  });
