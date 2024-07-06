const mongoose = require("mongoose");
require("dotenv").config();
const ConnectDb = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Db Connected Successfully");
    })
    .catch((err) => {
      console.log("Failed To connect", err);
    });
};

module.exports = ConnectDb;
