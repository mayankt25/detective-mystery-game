import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const CrimeContext = createContext();

export const CrimeProvider = ({ children, navigate }) => {
    const [crimeData, setCrimeData] = useState(null);
    const [mode, setMode] = useState("normal");
    const [timeRemaining, setTimeRemaining] = useState(300);

    useEffect(() => {
        let timerInterval;

        if (mode === "timer") {
            timerInterval = setInterval(() => {
                setTimeRemaining((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(timerInterval);
                        setMode("normal");
                        setTimeRemaining(300);
                        setCrimeData(null);
                        toast.error("Time's up! Redirected to the home page for a fresh start.");
                        navigate("/");
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timerInterval);
    }, [mode]);

    const stopTimer = () => {
        setMode("normal");
    };

    return (
        <CrimeContext.Provider
            value={{ crimeData, setCrimeData, mode, setMode, timeRemaining, stopTimer }}
        >
            {children}
        </CrimeContext.Provider>
    );
};

export const useCrimeData = () => useContext(CrimeContext);
