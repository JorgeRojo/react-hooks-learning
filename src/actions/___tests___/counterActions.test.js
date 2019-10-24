import {
  COUNTER_DECREASE,
  COUNTER_INCREASE,
  COUNTER_RESET,
  COUNTER_SET
} from "../actionTypes";

import {
  counterDecrease,
  counterIncrease,
  counterReset,
  counterSet
} from "../counterActions";

describe("counterActions", () => {
  it("Action: counterDecrease", () => {
    const expected = {
      type: COUNTER_DECREASE
    };
    const actual = counterDecrease();
    expect(actual).toEqual(expected);
  });

  it("Action: counterIncrease", () => {
    const expected = {
      type: COUNTER_INCREASE
    };
    const actual = counterIncrease();
    expect(actual).toEqual(expected);
  });

  it("Action: counterReset", () => {
    const expected = {
      type: COUNTER_RESET
    };
    const actual = counterReset();
    expect(actual).toEqual(expected);
  });

  it("Action: counterSet", () => {
    const number = 999;
    const expected = {
      type: COUNTER_SET,
      payload: { number }
    };
    const actual = counterSet(number);
    expect(actual).toEqual(expected);
  });
});
