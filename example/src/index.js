import { app } from "hyperapp";
import "./index.css";
import App from "./App";

app({
    init: {}, view: state => App(state), node: document.getElementById("app")
});
