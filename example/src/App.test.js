import { h, app } from "hyperapp";
import App from "./App";

it("renders without crashing", () => {
  app({ view: () => <App />, node: document.getElementById("app") });
});
