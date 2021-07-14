import { Button } from "@material-ui/core";
import {
    PlayCircleFilled,
    PauseCircleFilled,
    RotateLeft,
} from "@material-ui/icons";
import React, { useRef, useEffect } from "react";
import { useContextTime } from "../context";
import "./Display.css";

const Display = () => {
    const {
        displayTime,
        formatTime,
        resetUI,
        isRunning,
        play,
        isBreak,
        sessionTime,
        breakTime,
        setIsRunning,
    } = useContextTime();
    const lineTimeRef = useRef();

    useEffect(() => {
        if (isRunning) {
            isBreak
                ? (lineTimeRef.current.style.width = `${
                      (displayTime * 100) / breakTime
                  }%`)
                : (lineTimeRef.current.style.width = `${
                      (displayTime * 100) / sessionTime
                  }%`);
        }
    }, [displayTime]);

    return (
        <section className="session">
            <div>
                <h2 id="timer-label" className="text-center session__status">
                    {isBreak ? "BREAK" : "SESSION"}
                    <div
                        className="session__status--line"
                        ref={lineTimeRef}
                    ></div>
                </h2>
            </div>
            <div id="time-left" className="session__time text-center">
                {formatTime(displayTime)}
            </div>
            <div className="controls">
                <Button
                    id="start_stop"
                    variant="outlined"
                    onClick={() => setIsRunning(!isRunning)}
                >
                    {isRunning ? (
                        <PauseCircleFilled fontSize="large" />
                    ) : (
                        <PlayCircleFilled fontSize="large" />
                    )}
                </Button>
                <Button id="reset" variant="outlined" onClick={resetUI}>
                    <RotateLeft fontSize="large" />
                </Button>
            </div>
        </section>
    );
};

export default Display;
