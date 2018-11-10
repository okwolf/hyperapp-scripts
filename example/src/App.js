import { h } from "hyperapp";
import logo from "./logo.svg";
import "./App.css";

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://hyperapp.js.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn Hyperapp
      </a>
    </header>
  </div>
);

export default App;
