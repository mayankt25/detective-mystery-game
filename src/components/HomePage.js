import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

const HomePage = () => {
  const [numSuspects, setNumSuspects] = useState(3);

  return (
    <div className="container text-center mt-5">
      <h1>Welcome to the Detective Mystery Solver</h1>
      <p>Select the number of suspects and start the game.</p>
      <Form>
        <Form.Group controlId="numSuspects">
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
        <Link to={`/game/${numSuspects}`}>
          <Button variant="primary">Start Game</Button>
        </Link>
      </Form>
    </div>
  );
};

export default HomePage;