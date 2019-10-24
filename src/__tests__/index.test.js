import React from "react";
import ReactDOM from "react-dom";
import "../index.js";
import App from "../components/App";
import { mockComponent } from "../testHelpers";

jest.mock("react-dom");
jest.mock("../components/App");

it("main", () => {
  App.mockReturnValue(jest.fn());
  expect(ReactDOM.render).toHaveBeenCalledTimes(1);
  expect(ReactDOM.render).toHaveBeenCalledWith(<App />, null);
});
