import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getSuspectDialogue } from "./suspectDialogues";
import { useParams } from "react-router-dom";

const InterrogationPage = ({ suspects }) => {
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [suspectResponse, setSuspectResponse] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [allResponses, setAllResponses] = useState({});
  const navigate = useNavigate();
  const { suspectName } = useParams();
  const currentIndex = suspects.findIndex((suspect) => suspect === suspectName);

  useEffect(() => {
    setAllResponses((prev) => {
      const updatedResponses = { ...prev };
      if (!updatedResponses[suspectName]) {
        updatedResponses[suspectName] = {
          motive: false,
          weapon: false,
          alibi: false,
          eyewitness: false,
        };
      }
      return updatedResponses;
    });
    resetForNewSuspect();
  }, [suspectName]);

  const resetForNewSuspect = () => {
    setSelectedQuestion("");
    setSuspectResponse("");
    setSelectedOption("");
  };

  const handleQuestionChange = (e) => {
    setSelectedQuestion(e.target.value);
    setSelectedOption("");
  };

  const handleAskQuestion = () => {
    if (selectedQuestion) {
      const response = getSuspectDialogue(suspectName, selectedQuestion);
      setSuspectResponse(response);
    }
  };

  const handleOptionChange = (e) => {
    const value = e.target.value === "Yes";
    setSelectedOption(e.target.value);
    if (selectedQuestion) {
      setAllResponses((prev) => ({
        ...prev,
        [suspectName]: {
          ...prev[suspectName],
          [selectedQuestion]: value,
        },
      }));
    }
  };

  const handleNextSuspect = () => {
    if (currentIndex < suspects.length - 1) {
      const nextSuspect = suspects[currentIndex + 1];
      navigate(`/interrogate/${nextSuspect}`);
    } else {
      console.log("Final Data: ", allResponses);
      navigate("/game/3");
    }
  };

  const isLastSuspect = currentIndex === suspects.length - 1;

  const getQuestionText = () => {
    switch (selectedQuestion) {
      case "motive":
        return "Do you think the suspect has a motive?";
      case "weapon":
        return "Do you think the weapon found is linked with the suspect?";
      case "alibi":
        return "Do you think the alibi is verified?";
      case "eyewitness":
        return "Do you think the suspect was seen by any eyewitness?";
      default:
        return "";
    }
  };

  if (!suspectName) {
    return <div>Error: Suspect not found</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Interrogate {suspectName}</h2>
      <h4>Choose a question to ask the suspect:</h4>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Question</Form.Label>
          <Form.Control as="select" value={selectedQuestion} onChange={handleQuestionChange}>
            <option value="">Select a question</option>
            <option value="motive">Do you have a motive?</option>
            <option value="weapon">Was the weapon found linked to you?</option>
            <option value="alibi">What's your alibi?</option>
            <option value="eyewitness">Were you seen by an eyewitness?</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" onClick={handleAskQuestion} className="mb-3">
          Ask Question
        </Button>
      </Form>

      {suspectResponse && (
        <div className="mt-3">
          <h5>Suspect's Response:</h5>
          <p>{suspectResponse}</p>
        </div>
      )}

      {suspectResponse && selectedQuestion && (
        <div className="mt-4">
          <h5>What do you think?</h5>
          <p>{getQuestionText()}</p>
          <Form>
            <Form.Check
              type="radio"
              label="Yes"
              value="Yes"
              checked={selectedOption === "Yes"}
              onChange={handleOptionChange}
            />
            <Form.Check
              type="radio"
              label="No"
              value="No"
              checked={selectedOption === "No"}
              onChange={handleOptionChange}
            />
          </Form>
          <p>Selected answer: {selectedOption}</p>
        </div>
      )}

      <Button variant="secondary" className="mt-3" onClick={handleNextSuspect}>
        {isLastSuspect ? "End Interrogation" : "Next Suspect"}
      </Button>
    </div>
  );
};

export default InterrogationPage;