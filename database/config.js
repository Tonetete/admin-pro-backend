const { DB_CONNECTIONSTR } = process.env;
const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(DB_CONNECTIONSTR, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Database connection stablished");
  } catch (error) {
    console.log(error);
    throw new Error("Cannot init database.");
  }
};

module.exports = {
  dbConnection,
};
