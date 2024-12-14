import React, { createContext, useContext, useState, useEffect } from "react";

const CrimeContext = createContext();

export const CrimeProvider = ({ children }) => {
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
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timerInterval);
    }, [mode]);

    return (
        <CrimeContext.Provider
            value={{ crimeData, setCrimeData, mode, setMode, timeRemaining }}
        >
            {children}
        </CrimeContext.Provider>
    );
};

export const useCrimeData = () => useContext(CrimeContext);
