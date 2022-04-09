const mongoose = require("mongoose");

const connectToDB = (url) => {
  return mongoose.connect(url);
};

const logError = (msg) => {
  console.error(`%c${msg}`, "background: #fff; color: #000; font-weight: bold");
};

module.exports = {
  connectToDB,
  logError,
};
