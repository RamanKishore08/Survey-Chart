const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

const SurveyResponse = require("./models/SurveyResponse");

// Submit Survey
app.post("/api/survey/submit", async (req, res) => {
  try {
    console.log("📥 Received Data:", req.body);

    const { productName, categoryType, productSatisfaction, rating, feedback } = req.body;

    // Validate required fields
    if (!productName || !categoryType || !productSatisfaction || rating === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Ensure rating is a number
    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Invalid rating value" });
    }

    const newResponse = new SurveyResponse({ productName, categoryType, productSatisfaction, rating, feedback });
    await newResponse.save();

    console.log("✅ Survey Saved Successfully");
    res.status(201).json({ message: "Survey submitted successfully!" });
  } catch (error) {
    console.error("❌ Error saving survey response:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get Survey Responses
app.get("/api/survey/responses", async (req, res) => {
  try {
    const responses = await SurveyResponse.find();
    res.status(200).json(responses);
  } catch (error) {
    console.error("❌ Error fetching survey responses:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
