import React, { useState } from "react";
import axios from "axios";
import { Card, Form, Button } from "react-bootstrap";

export default function SurveyForm() {
  const [formData, setFormData] = useState({
    productName: "",
    categoryType: "",
    productSatisfaction: "Good",
    rating: 1,
    feedback: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.productName || !formData.categoryType) {
      alert("Please fill in all required fields.");
      return;
    }
  
    try {
      const response = await axios.post("https://survey-form-vj40.onrender.com/api/survey/submit", formData, {
        headers: { "Content-Type": "application/json" }
      });
      alert(response.data.message);
      setFormData({ productName: "", categoryType: "", productSatisfaction: "Good", rating: 1, feedback: "" });
    } catch (error) {
      console.error("Error submitting survey:", error.response?.data || error.message);
      alert("Failed to submit survey. Please check the fields.");
    }
  };
  

  return (
    <Card className="p-4 shadow-sm">
      <h2 className="mb-3">Survey Form</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Product Name:</Form.Label>
          <Form.Control
            type="text"
            value={formData.productName}
            onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category Type:</Form.Label>
          <Form.Select
            value={formData.categoryType}
            onChange={(e) => setFormData({ ...formData, categoryType: e.target.value })}
            required
          >
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Home & Kitchen">Home & Kitchen</option>
            <option value="Other">Other</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Product Satisfaction:</Form.Label>
          <div>
            {["Good", "Not Satisfied", "Worst"].map((option) => (
              <Form.Check
                key={option}
                type="radio"
                label={option}
                name="satisfaction"
                value={option}
                checked={formData.productSatisfaction === option}
                onChange={(e) => setFormData({ ...formData, productSatisfaction: e.target.value })}
              />
            ))}
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Rating:</Form.Label>
          <Form.Select
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
            required
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Feedback:</Form.Label>
          <Form.Control
            as="textarea"
            value={formData.feedback}
            onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
          />
        </Form.Group>

        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </Card>
  );
}
