const mongoose = require("mongoose");

const SurveyResponseSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  categoryType: { type: String, required: true },
  productSatisfaction: { type: String, enum: ["Good", "Not Satisfied", "Worst"], required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  feedback: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SurveyResponse", SurveyResponseSchema);
