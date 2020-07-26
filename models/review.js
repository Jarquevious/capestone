const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  createdAt: { type: Date },
  updatedAt: { type: Date },
  name: { type: String, required: true },
  url: { type: String, required: true },
  summary: { type: String, required: true }
});

ReviewSchema.pre("save", function(next) {
  // SET createdAt AND updatedAt
  const now = new Date();
  this.updatedAt = now;

  if (!this.createdAt) {
    this.createdAt = now;
  }

  next();
});

module.exports = mongoose.model("Review", ReviewSchema);