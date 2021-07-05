import React, { useState, useContext, useEffect } from "react";

const ContextTime = React.createContext();

const ContextTimeProvider = ({ children }) => {
    const [displayTime, setDisplayTime] = useState(25 * 60);
    const [breakTime, setBreakTime] = useState(5 * 60);
    const [sessionTime, setSessionTime] = useState(25 * 60);

    const [isRunning, setIsRunning] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    const [playTimerID, setPlayTimerID] = useState(null);

    const breakSound = document.getElementById("beep");

    useEffect(() => {
        breakSound.preload = "auto";
    }, []);

    const breakAlarm = () => {
        breakSound.currentTime = 0;
        breakSound.play();
    };

    const resetAlarm = () => {
        breakSound.pause();
        breakSound.currentTime = 0;
    };

    /* const play = () => {
        if (isRunning) {
            clearInterval(playTimerID);
            setIsRunning(false);
        } else {
            const intervalID = setInterval(() => {
                setDisplayTime((prev) => {
                    if (prev <= 0 && !isBreak) {
                        breakAlarm();
                        setIsBreak(true);
                        return breakTime;
                    } else if (prev <= 0 && isBreak) {
                        setIsBreak(false);
                        return sessionTime;
                    }
                    return prev - 1;
                });
            }, 1000);
            setPlayTimerID(intervalID);
            setIsRunning(true);
        }
    }; */

    useEffect(() => {
        if (isRunning) {
            displayTime == 0 && breakAlarm();
            const intervalID = setInterval(() => {
                setDisplayTime((prev) => {
                    if (prev <= 0 && !isBreak) {
                        setIsBreak(true);
                        return breakTime;
                    } else if (prev <= 0 && isBreak) {
                        setIsBreak(false);
                        return sessionTime;
                    }
                    return prev - 1;
                });
            }, 1000);
            setPlayTimerID(intervalID);
            return () => clearInterval(intervalID);
        } else if (!isRunning && playTimerID) {
            clearInterval(playTimerID);
        }
    }, [displayTime, isRunning]);

    const handleChangeTime = (type, amount) => {
        if (type === "break") {
            if (breakTime <= 60 && amount < 60) return;
            setBreakTime((prev) => prev + amount);
        } else {
            if (sessionTime <= 60 && amount < 60) return;
            setSessionTime((prev) => prev + amount);
        }
    };

    // Update displayTime everytime the sessionTime is updated
    useEffect(() => {
        setDisplayTime(sessionTime);
    }, [sessionTime]);

    const resetUI = () => {
        setIsRunning(false);
        setBreakTime(5 * 60);
        setSessionTime(25 * 60);
        setDisplayTime(25 * 60);
        setIsBreak(false);
        resetAlarm();
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
    };

    const formatLength = (time) => {
        return Math.floor(time / 60);
    };
    return (
        <ContextTime.Provider
            value={{
                displayTime,
                formatTime,
                breakTime,
                sessionTime,
                handleChangeTime,
                resetUI,
                isRunning,
                /* play, */
                isBreak,
                setIsRunning,
                formatLength,
            }}
        >
            {children}
        </ContextTime.Provider>
    );
};

const useContextTime = () => {
    return useContext(ContextTime);
};

export { ContextTimeProvider, useContextTime };
