import React from "react";
import "./Length.css";
import { Button } from "@material-ui/core";
import { RemoveCircle, AddCircle } from "@material-ui/icons";
import { useContextTime } from "../context";

const Length = ({ title, type }) => {
    const {
        formatTime,
        breakTime,
        sessionTime,
        handleChangeTime,
        isPlaying,
        formatLength,
    } = useContextTime();

    const lowLimitTime =
        (breakTime <= 60 && type === "break") ||
        (sessionTime <= 60 && type === "session");
    const overLimitTime =
        (breakTime >= 60 * 60 && type === "break") ||
        (sessionTime >= 60 * 60 && type === "session");

    return (
        <section className="length">
            <h5
                id={type === "break" ? "break-label" : "session-label"}
                className="length__title text-center"
            >
                {title}
            </h5>
            <div
                id={type === "break" ? "break-length" : "session-length"}
                className="length__time text-center"
            >
                {type === "break"
                    ? formatLength(breakTime)
                    : formatLength(sessionTime)}
            </div>
            <div className="controls">
                <Button
                    id={
                        type === "break"
                            ? "break-decrement"
                            : "session-decrement"
                    }
                    variant="outlined"
                    onClick={() => handleChangeTime(type, -60)}
                    disabled={lowLimitTime || isPlaying}
                >
                    <RemoveCircle fontSize="large" />
                </Button>
                <Button
                    id={
                        type === "break"
                            ? "break-increment"
                            : "session-increment"
                    }
                    variant="outlined"
                    onClick={() => handleChangeTime(type, 60)}
                    disabled={overLimitTime || isPlaying}
                >
                    <AddCircle fontSize="large" />
                </Button>
            </div>
        </section>
    );
};

export default Length;
