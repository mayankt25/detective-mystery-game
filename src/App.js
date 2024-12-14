import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import GamePage from "./components/GamePage";
import InterrogationResults from "./components/InterrogationResults";
import ResultsPage from "./components/ResultsPage";
import { CrimeProvider } from "./CrimeContext";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <CrimeProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game/:numSuspects" element={<GamePage />} />
            <Route path="/interrogation-result/:suspectName" element={<InterrogationResults />} />
            <Route path="/results" element={<ResultsPage />} />
          </Routes>
        </div>
      </Router>
    </CrimeProvider>
  );
};

export default App;