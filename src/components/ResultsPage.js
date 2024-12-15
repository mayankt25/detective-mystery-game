import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCrimeData } from "../CrimeContext";
import { toast } from "react-toastify";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ResultsPage = () => {
  const location = useLocation();
  const { finalData } = location.state || {};
  const [apiResults, setApiResults] = useState(null);
  const [answer, setAnswer] = useState(null);
  const { crimeData } = useCrimeData();

  const formattedResults = apiResults
    ? Object.entries(apiResults).map(([name, probability]) => ({
      name,
      percentage: (probability * 100).toFixed(2),
    }))
    : [];

  useEffect(() => {
    if (answer && crimeData) {
      const isCorrect = answer === crimeData.killer;
      const message = isCorrect
        ? "Congratulations! You identified the killer!"
        : `Sorry, the killer was ${crimeData.killer}. Better luck next time!`;

      toast(message, { type: isCorrect ? "success" : "error" });
    }
  }, [answer, crimeData]);

  useEffect(() => {
    if (finalData) {
      fetch("http://this.is.dora/api/from-dora", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      }).then((res) => res.json()).then((data) => {
        setApiResults(data);
        const highest = Object.entries(data).reduce((a, b) =>
          b[1] > a[1] ? b : a
        );
        setAnswer(highest[0]);
      })
        .catch((err) => console.error("Error:", err));
    }
  }, [finalData]);

  return (
    <div className="container">
      <h1 className="my-4 text-center">Results</h1>

      <div className="text-center mb-4">
        <h4>Your choice: {answer}</h4>
        <h5>Actual Killer: {crimeData.killer}</h5>
      </div>

      <div className="row justify-content-center mb-4">
        {formattedResults.map(({ name, percentage }) => (
          <div
            className="col-md-4 mb-4 d-flex flex-column align-items-center mt-4"
            key={name}
          >
            <h5 className="mb-3">{name}</h5>

            <div style={{ width: "120px", height: "120px" }}>
              <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                styles={{
                  path: {
                    stroke: "#007bff",
                    strokeWidth: 10,
                  },
                  trail: {
                    stroke: "#f8f9fa",
                    strokeWidth: 10,
                  },
                  text: {
                    fill: "#007bff",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  },
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mb-4">
        {answer === crimeData.killer ? <h5 style={{ color: "green" }}>You Won</h5> : <h5 style={{ color: "red" }}>You Lost</h5>}
      </div>
    </div>
  );
};

export default ResultsPage;