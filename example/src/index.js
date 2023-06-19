import { app } from "hyperapp";
import "./index.css";
import App from "./App";
import * as counter from "./counter";

app({
  init: { ...counter.state },
  view: state => <App {...state} />,
  node: document.getElementById("app")
});
