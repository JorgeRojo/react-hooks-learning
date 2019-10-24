import React from "react";
import ReactDOM from "react-dom";
import { render, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";

import store from "../../../store";

import { selectCounter } from "../../../reducer/counter";

import CounterHeader from "../CounterHeader";

jest.mock("../../../store", () =>
  require("../../../store/___mocks___/mockStore")
);
jest.mock("../../../reducer/counter");

describe("CounterHeader Component", () => {
  const component = (
    <Provider store={store}>
      <CounterHeader />
    </Provider>
  );

  beforeEach(() => {
    selectCounter.mockReturnValue(999);
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(component, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders the component", () => {
    const { container } = render(component);
    expect(container).toMatchSnapshot();
  });
});
