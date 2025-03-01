import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import SurveyForm from "../components/SurveyForm";

import { Container, Button } from "react-bootstrap";

export default function Home() {
  const [responses, setResponses] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios.get("https://survey-form-vj40.onrender.com/api/survey/responses").then((res) => {
      setResponses(res.data);
    });
  }, []);

  return (
    <Container className="mt-5">
      <SurveyForm />
      <div className="d-flex justify-content-center mt-3">
        <Button variant="primary" onClick={() => router.push("/dashboard")}>
          View Dashboard
        </Button>
      </div>
    </Container>
  );
}
