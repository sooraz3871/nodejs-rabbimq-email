const mongoose = require("mongoose");
const dotenv = require("dotenv");
const logger = require("../utils/logger/logger");

dotenv.config();

try {
  const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };
  mongoose.connect(process.env.CONNECTION_STRING, connectionOptions)
  .then(() => {
    console.log('DB connection successfully');
  })
  .catch(err => console.log("DB ERROR",err));

  mongoose.Promise = global.Promise;
} catch (error) {
  logger.info(error);
}

module.exports = {
  Email: require("../models/email"),
};
