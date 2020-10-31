import { app } from "hyperapp";
import "./index.css";
import App from "./App";

app({
  init: {},
  view: () => <App />,
  node: document.getElementById("app")
});
