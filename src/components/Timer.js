import React from "react";
import { useCrimeData } from "../CrimeContext";
import { ProgressBar } from "react-bootstrap";

const Timer = () => {
    const { timeRemaining } = useCrimeData();

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
    };

    const percentage = (timeRemaining / 300) * 100;

    return (
        <div className="mt-3">
            <div className="d-flex align-items-center">
                <h5 className="me-3">Time Left:</h5>
                <span className="fw-bold text-danger">{formatTime(timeRemaining)}</span>
            </div>
            <ProgressBar
                now={percentage}
                label={`${Math.round(percentage)}%`}
                variant={percentage > 50 ? "success" : percentage > 20 ? "warning" : "danger"}
            />
        </div>
    );
};

export default Timer;