import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";

import App from "../App";
import { mockComponent } from "../../testHelpers";

jest.mock("../Counter/CounterHeader", () => props =>
  mockComponent("CounterHeader", props)
);
jest.mock("../Counter/CounterForm", () => props =>
  mockComponent("CounterForm", props)
);

describe("App Component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders the component", () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });
});
