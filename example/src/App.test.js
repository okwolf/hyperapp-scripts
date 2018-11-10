import { h, app } from "hyperapp";
import App from "./App";

it("renders without crashing", () => {
  app({}, {}, () => <App />, document.body);
});
