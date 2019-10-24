import React from "react";
import ReactDOM from "react-dom";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";

import store from "../../../store";
import { selectCounter } from "../../../reducer/counter";
import {
  counterIncrease,
  counterDecrease,
  counterSet,
  counterReset
} from "../../../actions/counterActions";

import CounterForm from "../CounterForm";

jest.mock("../../../store", () =>
  require("../../../store/___mocks___/mockStore")
);
jest.mock("../../../reducer/counter");
jest.mock("../../../actions/counterActions");

describe("CounterForm Component", () => {
  const component = (
    <Provider store={store}>
      <CounterForm />
    </Provider>
  );

  const setup = () => {
    const utils = render(component);
    const counterIncreaseBtn = utils.getByLabelText("counterIncreaseBtn");
    const counterDecreaseBtn = utils.getByLabelText("counterDecreaseBtn");
    const counterResetBtn = utils.getByLabelText("counterResetBtn");
    const handleChangeNumberInput = utils.getByLabelText(
      "handleChangeNumberInput"
    );
    const handleClickSetBtn = utils.getByLabelText("handleClickSetBtn");
    const handleChangeSetInput = utils.getByLabelText("handleChangeSetInput");
    return {
      ...utils,
      counterIncreaseBtn,
      counterDecreaseBtn,
      counterResetBtn,
      handleChangeNumberInput,
      handleClickSetBtn,
      handleChangeSetInput
    };
  };

  beforeEach(() => {
    selectCounter.mockReturnValue(999);
    counterIncrease.mockImplementation(() => ({ type: "counterIncrease" }));
    counterDecrease.mockImplementation(() => ({ type: "counterDecrease" }));
    counterSet.mockImplementation(() => ({ type: "counterSet" }));
    counterReset.mockImplementation(() => ({ type: "counterReset" }));
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
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it("counterIncrease", () => {
    const { counterIncreaseBtn } = setup();
    fireEvent.click(counterIncreaseBtn);
    expect(counterIncrease).toHaveBeenCalledTimes(1);
  });

  it("counterDecrease", () => {
    const { counterDecreaseBtn } = setup();
    fireEvent.click(counterDecreaseBtn);
    expect(counterDecrease).toHaveBeenCalledTimes(1);
  });

  it("counterReset", () => {
    const { counterResetBtn } = setup();
    fireEvent.click(counterResetBtn);
    expect(counterReset).toHaveBeenCalledTimes(1);
  });

  it("counterSet from handleClickSet", () => {
    const value = 666;
    const { handleChangeNumberInput, handleClickSetBtn } = setup();
    fireEvent.change(handleChangeNumberInput, { target: { value } });
    fireEvent.click(handleClickSetBtn);
    expect(counterSet).toHaveBeenCalledTimes(1);
    expect(counterSet).toHaveBeenCalledWith(value);
  });

  it("counterSet from handleClickSet with empty value", () => {
    const value = "";
    const { handleChangeNumberInput, handleClickSetBtn } = setup();
    fireEvent.change(handleChangeNumberInput, { target: { value } });
    fireEvent.click(handleClickSetBtn);
    expect(counterSet).toHaveBeenCalledTimes(1);
    expect(counterSet).toHaveBeenCalledWith(value);
  });

  it("counterSet from handleClickSet with NaN value", () => {
    const { handleChangeNumberInput, handleClickSetBtn } = setup();
    fireEvent.change(handleChangeNumberInput, { target: { value: "a" } });
    fireEvent.click(handleClickSetBtn);
    expect(counterSet).toHaveBeenCalledTimes(1);
    expect(counterSet).toHaveBeenCalledWith(0);
  });

  it("counterSet from handleKeyPressSet", () => {
    const value = 2;
    const { handleChangeNumberInput } = setup();
    fireEvent.change(handleChangeNumberInput, { target: { value } });
    fireEvent.keyPress(handleChangeNumberInput, {
      key: "2",
      code: 50,
      charCode: 50
    });
    fireEvent.keyPress(handleChangeNumberInput, { key: "Enter", keyCode: 13 });
    expect(counterSet).toHaveBeenCalledTimes(1);
    expect(counterSet).toHaveBeenCalledWith(value);
  });

  it("counterSet from handleChangeSetInput", () => {
    const value = 777;
    const { handleChangeSetInput } = setup();
    fireEvent.change(handleChangeSetInput, { target: { value } });
    expect(counterSet).toHaveBeenCalledTimes(1);
    expect(counterSet).toHaveBeenCalledWith(value);
  });
});
