const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const DB_URL = process.env.DB_URL;
    await mongoose.connect(process.env.DB_URL);
    console.log("Database Connected");
  } catch (e) {
    console.log(e);
  }
};
module.exports = dbConnect;
