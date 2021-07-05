import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ContextTimeProvider } from "./context";

ReactDOM.render(
    <React.StrictMode>
        <ContextTimeProvider>
            <App />
        </ContextTimeProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
