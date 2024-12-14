import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useCrimeData } from "../CrimeContext";

const HomePage = () => {
  const [numSuspects, setNumSuspects] = useState(3);
  const { mode, setMode } = useCrimeData();

  return (
    <div className="container text-center mt-5">
      <h1>Welcome to the Detective Mystery Solver</h1>
      <p>Select the number of suspects and game mode to start.</p>

      <Form>
        <Form.Group controlId="numSuspects" className="mb-3">
          <Form.Label>Select Number of Suspects</Form.Label>
          <Form.Control
            as="select"
            value={numSuspects}
            onChange={(e) => setNumSuspects(Number(e.target.value))}
          >
            <option value={3}>3 Suspects</option>
            <option value={4}>4 Suspects</option>
            <option value={5}>5 Suspects</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="gameMode" className="mb-4">
          <Form.Label>Select Game Mode</Form.Label>
          <Form.Control
            as="select"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="normal">Normal Mode</option>
            <option value="timer">Timer Mode</option>
          </Form.Control>
        </Form.Group>

        <Link to={`/game/${numSuspects}`}>
          <Button variant="primary">Start Game</Button>
        </Link>
      </Form>
    </div>
  );
};

export default HomePage;