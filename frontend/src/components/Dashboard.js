import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Card, Row, Col } from "react-bootstrap";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function Dashboard({ responses }) {
  const satisfactionData = {
    labels: responses.map((response) => response.productName),
    datasets: [
      {
        label: "Good",
        data: responses.map((response) => (response.productSatisfaction === "Good" ? 1 : 0)),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Not Satisfied",
        data: responses.map((response) => (response.productSatisfaction === "Not Satisfied" ? 1 : 0)),
        backgroundColor: "rgba(255, 159, 64, 0.6)",
      },
      {
        label: "Worst",
        data: responses.map((response) => (response.productSatisfaction === "Worst" ? 1 : 0)),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const categoryRatings = {};
  responses.forEach((response) => {
    if (!categoryRatings[response.categoryType]) {
      categoryRatings[response.categoryType] = { total: 0, count: 0 };
    }
    categoryRatings[response.categoryType].total += response.rating;
    categoryRatings[response.categoryType].count += 1;
  });

  const pieData = {
    labels: Object.keys(categoryRatings),
    datasets: [
      {
        label: "Average Rating",
        data: Object.values(categoryRatings).map((data) => data.total / data.count),
        backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0"],
      },
    ],
  };

  return (
    <Row className="justify-content-center mt-3">
      {/* Product Satisfaction Bar Chart */}
      <Col md={5} className="mb-4">
        <Card className="p-3 shadow-sm">
          <h5 className="mb-3 text-center">Product Satisfaction by Product</h5>
          <div style={{ height: "250px" }}>
            <Bar data={satisfactionData} options={{ maintainAspectRatio: false }} />
          </div>
        </Card>
      </Col>

      {/* Category Average Rating Pie Chart */}
      <Col md={5} className="mb-4">
        <Card className="p-3 shadow-sm">
          <h5 className="mb-3 text-center">Average Rating by Category</h5>
          <div style={{ height: "250px" }}>
            <Pie data={pieData} options={{ maintainAspectRatio: false }} />
          </div>
        </Card>
      </Col>
    </Row>
  );
}
