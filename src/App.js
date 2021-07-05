import "./App.css";
import Display from "./components/Display";
import Header from "./components/Header";
import Length from "./components/Length";

function App() {
    return (
        <main className="container">
            <Header />
            <Display />
            <div className="container__length">
                <Length title="Break Length" type="break" />
                <Length title="Session Length" type="session" />
            </div>
        </main>
    );
}

export default App;
