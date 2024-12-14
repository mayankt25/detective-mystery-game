import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useCrimeData } from "../CrimeContext";
import Timer from "../components/Timer";

const GamePage = () => {
  const { numSuspects } = useParams();
  const { crimeData, setCrimeData, mode } = useCrimeData();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCrimeData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/random-case");
        const data = await response.json();
        setCrimeData(data);
      } catch (error) {
        console.error("Error fetching crime data:", error);
      }
    };

    if (!crimeData) {
      fetchCrimeData();
    }
  }, [crimeData, setCrimeData]);

  if (!crimeData) {
    return <div>Loading crime data...</div>;
  }

  const suspects = crimeData.suspects.slice(0, numSuspects);

  const handleInterrogationResults = () => {
    navigate(`/interrogation-result/${suspects[0].name}`);
  };

  return (
    <div className="container mt-5">
      {mode === "timer" && <Timer />}
      <h3 className="mb-3">Crime Scene: {crimeData.crime_scene}</h3>
      <h3>Suspects:</h3>
      <ul>
        {suspects.map((suspect, index) => (
          <li key={index}>
            {suspect.name}
          </li>
        ))}
      </ul>
      <Button variant="primary" onClick={handleInterrogationResults} className="mb-3">
        View Interrogation Results
      </Button>
    </div>
  );
};

export default GamePage;