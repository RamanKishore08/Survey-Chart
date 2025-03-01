import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }

  try {
    if (req.method === "POST") {
      const response = await axios.post("https://survey-form-vj40.onrender.com/api/survey/submit", req.body);
      return res.status(201).json(response.data);
    } else if (req.method === "GET") {
      const response = await axios.get("https://survey-form-vj40.onrender.com/api/survey/responses");
      return res.status(200).json(response.data);
    } else {
      return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("API Error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}
