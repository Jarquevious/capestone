/* Mongoose Connection */
const mongoose = require("mongoose");
assert = require("assert");

// const url = "mongodb://localhost/eduyelp-db";
mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb://localhost/eduyelp-db",
  { useNewUrlParser: true, useUnifiedTopology: true }
  // { useUnifiedTopology: true }
);
mongoose.connection.on("error", console.error.bind(console, "MongoDB connection Error:")); 
mongoose.set('debug', true);

module.exports = mongoose.connection;