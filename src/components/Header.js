import React from "react";
import "./Header.css";

const Header = () => {
    return (
        <header>
            <h1 className="title text-center">Pomodoro Clock</h1>
            <div className="infos">
                <h4 className="text-center">
                    For the FreeCodeCamp Frontend Framework Certification
                </h4>
                <div className="infos__technologies text-center">
                    <p>Made with React using:</p>
                    <ul className="infos__list">
                        <li>useState</li>
                        <li>useEffect</li>
                        <li>useRef</li>
                        <li>useContext</li>
                        <li>Material-UI</li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;
