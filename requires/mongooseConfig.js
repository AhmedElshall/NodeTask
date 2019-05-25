const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/Task";

mongoose
  .connect(MONGO_URL)
  .then(res => console.log("Mongoo Connected Successfully"))
  .catch(err => console.log("Something Wrong Check Your Connection"));
