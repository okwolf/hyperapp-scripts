import { h, app } from "hyperapp";
import "./index.css";
import App from "./App";

app({ view: () => <App />, node: document.getElementById("app") });
