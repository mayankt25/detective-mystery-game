import React from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useCrimeData } from "../CrimeContext";

const HomePage = () => {
  const { mode, setMode } = useCrimeData();

  return (
    <div className="container text-center mt-5">
      <img src="/detective-image.png" alt="Detective Image" className="img-fluid" style={{width: "60%", marginBottom: "70px"}} />
      <h1 className="mb-4">Welcome to DetectiveIQ</h1>

      <Form>
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

        <Link to={`/game`}>
          <Button variant="primary">Start Game</Button>
        </Link>
      </Form>
    </div>
  );
};

export default HomePage;