import React from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import GamePage from "./components/GamePage";
import InterrogationResults from "./components/InterrogationResults";
import ResultsPage from "./components/ResultsPage";
import { CrimeProvider } from "./CrimeContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WrappedCrimeProvider = ({ children }) => {
  const navigate = useNavigate();
  return <CrimeProvider navigate={navigate}>{children}</CrimeProvider>;
};

const App = () => {
  return (
    <Router>
      <WrappedCrimeProvider>
        <div className="App">
          <ToastContainer position="top-right" theme="light" />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/interrogation-result/:suspectName" element={<InterrogationResults />} />
            <Route path="/results" element={<ResultsPage />} />
          </Routes>
        </div>
      </WrappedCrimeProvider>
    </Router>
  );
};

export default App;