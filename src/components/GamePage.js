import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { cases } from "../data";

const GamePage = () => {
  const { numSuspects } = useParams();
  const gameData = cases[0];
  const suspects = gameData.suspects.slice(0, numSuspects);
  const navigate = useNavigate();

  const handleInterrogation = () => {
    navigate(`/interrogate/${suspects[0].name}`);
  }

  return (
    <div className="container mt-5">
      <h3 className="mb-3">Crime Scene: {gameData.crimeScene}</h3>
      <h3>Suspects:</h3>
      <ul>
        {suspects.map((suspect, index) => (
          <li key={index}>
            {suspect.name}
          </li>
        ))}
      </ul>
      <Button variant="primary" onClick={handleInterrogation} className="mb-3">
        Start Interrogation
      </Button>
      {/* <Button variant="primary" onClick={handleInterrogation} className="mb-3">
        Analyze Crime Scene
      </Button> */}
    </div>
  );
};

export default GamePage;