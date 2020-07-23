const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  summary: { type: String, required: true }
});

module.exports = mongoose.model("Review", ReviewSchema);