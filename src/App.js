import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import GamePage from "./components/GamePage";
import InterrogationPage from "./components/InterrogationPage";
import ResultsPage from "./components/ResultsPage";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const suspects = ["John Smith", "Sarah Thompson", "Robert Lewis"];
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game/:numSuspects" element={<GamePage />} />
          <Route path="/interrogate/:suspectName" element={<InterrogationPage suspects={suspects} />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;