import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Dashboard from "../components/Dashboard";
import { Container, Button } from "react-bootstrap";

export default function DashboardPage() {
  const [responses, setResponses] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios.get("https://survey-form-vj40.onrender.com/api/survey/responses").then((res) => {
      setResponses(res.data);
    });
  }, []);

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between mb-4">
        <h2>Survey Dashboard</h2>
        <Button variant="secondary" onClick={() => router.push("/")}>
          Back to Survey
        </Button>
      </div>
      <Dashboard responses={responses} />
    </Container>
  );
}
