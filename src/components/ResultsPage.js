import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

const ResultsPage = () => {
  const [guiltProbabilities, setGuiltProbabilities] = useState([]);
  const [userGuess, setUserGuess] = useState("");
  const [resultMessage, setResultMessage] = useState("");

  useEffect(() => {
    axios
      .post("http://localhost:5000/find-culprit", { /* data */ }).then((response) => {
        setGuiltProbabilities(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Bayesian Network data:", error);
      });
  }, []);

  const handleSubmitGuess = () => {
    const correctAnswer = guiltProbabilities.reduce((max, suspect) => {
      return suspect.probability > max.probability ? suspect : max;
    }, {});
    if (userGuess === correctAnswer.name) {
      setResultMessage(`Correct! ${correctAnswer.name} is guilty.`);
    } else {
      setResultMessage(`Wrong! The guilty person is ${correctAnswer.name}.`);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Results</h2>
      <h4>Based on the Bayesian Network analysis, here are the guilt probabilities:</h4>
      <ul>
        {guiltProbabilities.map((suspect, index) => (
          <li key={index}>
            {suspect.name}: {suspect.probability * 100}% guilty
          </li>
        ))}
      </ul>
      <h4>Make your guess!</h4>
      <Form>
        <Form.Group>
          <Form.Label>Who do you think is guilty?</Form.Label>
          <Form.Control
            as="select"
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
          >
            {guiltProbabilities.map((suspect, index) => (
              <option key={index} value={suspect.name}>
                {suspect.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" onClick={handleSubmitGuess}>
          Submit Guess
        </Button>
      </Form>
      <p>{resultMessage}</p>
    </div>
  );
};

export default ResultsPage;