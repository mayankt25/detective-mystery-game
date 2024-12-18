import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useCrimeData } from "../CrimeContext";
import Timer from "../components/Timer";

const InterrogationResults = () => {
  const { crimeData, mode, stopTimer } = useCrimeData();
  const [allResponses, setAllResponses] = useState({});
  const navigate = useNavigate();
  const { suspectName } = useParams();

  const suspects = crimeData?.suspects || [];
  const currentIndex = suspects.findIndex((suspect) => suspect.name === suspectName);
  const suspect = suspects[currentIndex];

  useEffect(() => {
    if (suspectName) {
      setAllResponses((prev) => ({
        ...prev,
        [suspectName]: prev[suspectName] || {
          motive: null,
          evidence: null,
          alibi: null,
          eyewitness: null,
        },
      }));
    }
  }, [suspectName]);

  const handleOptionChange = (question, value) => {
    setAllResponses((prev) => ({
      ...prev,
      [suspectName]: {
        ...prev[suspectName],
        [question]: value === "Yes",
      },
    }));
  };

  const isLastSuspect = currentIndex === suspects.length - 1;

  const handleNextSuspect = () => {
    if (isLastSuspect) {
      stopTimer();
    }
    if (currentIndex < suspects.length - 1) {
      const nextSuspect = suspects[currentIndex + 1].name;
      navigate(`/interrogation-result/${nextSuspect}`);
    } else {
      const finalResponses = Object.fromEntries(
        Object.entries(allResponses).map(([suspect, answers]) => [
          suspect,
          Object.fromEntries(
            Object.entries(answers).map(([key, value]) => [key, value === null ? false : value])
          ),
        ])
      );
      console.log("Final Data: ", finalResponses);
      navigate("/results", { state: { finalData: finalResponses } });
    }
  };

  if (!suspect) {
    return <div>Error: Suspect not found</div>;
  }

  return (
    <div className="container mt-5">
      {mode === "timer" && <Timer key={suspectName} />}
      <h2>Interrogation Results for {suspect.name}</h2>

      <div className="mt-4">
        <h4 className="mb-3">Details:</h4>
        <p><strong>Relation:</strong> {suspect.relation}</p>
        <p><strong>Motives:</strong></p>
        <ul>
          {suspect.motives.map((motive, index) => (
            <li key={index}>{motive}</li>
          ))}
        </ul>
        <p><strong>Evidence:</strong> {suspect.evidence}</p>
        <p><strong>Alibi:</strong> {suspect.alibi}</p>
        <p><strong>Eyewitness:</strong> {suspect.eyewitness}</p>
        <p><strong>Mental State:</strong> {suspect.mental_state}</p>
      </div>

      <div className="mt-4">
        <h4>Your Assessment:</h4>
        {["motive", "evidence", "alibi", "eyewitness"].map((question) => (
          <div key={question} className="mb-3">
            <p>
              <strong>
                {question === "motive" && "Do you think the suspect has a motive?"}
                {question === "evidence" && "Do you think the evidence is linked with the suspect?"}
                {question === "alibi" && "Does the alibi fit the facts?"}
                {question === "eyewitness" && "Is the eyewitness statement believable?"}
              </strong>
            </p>
            <Form>
              <Form.Check
                type="radio"
                label="Yes"
                value="Yes"
                name={`${suspectName}-${question}`}
                checked={allResponses[suspectName]?.[question] === true}
                onChange={(e) => handleOptionChange(question, e.target.value)}
              />
              <Form.Check
                type="radio"
                label="No"
                value="No"
                name={`${suspectName}-${question}`}
                checked={allResponses[suspectName]?.[question] === false}
                onChange={(e) => handleOptionChange(question, e.target.value)}
              />
            </Form>
          </div>
        ))}
      </div>

      <Button variant="secondary" className="mt-3" onClick={handleNextSuspect}>
        {isLastSuspect ? "Check Results" : "Next Suspect"}
      </Button>
    </div>
  );
};

export default InterrogationResults;