import {
  COUNTER_DECREASE,
  COUNTER_INCREASE,
  COUNTER_RESET,
  COUNTER_SET
} from "../../../actions/actionTypes";

import reducer from "../index";

describe("counter reducer", () => {
  it("Default", () => {
    const action = {
      type: "none"
    };
    const expected = 0;
    expect(reducer(undefined, action)).toEqual(expected);
  });

  it("COUNTER_DECREASE", () => {
    const action = {
      type: COUNTER_DECREASE
    };
    const state = 1;
    const expected = 0;
    expect(reducer(state, action)).toEqual(expected);
  });

  it("COUNTER_INCREASE", () => {
    const action = {
      type: COUNTER_INCREASE
    };
    const state = 1;
    const expected = 2;
    expect(reducer(state, action)).toEqual(expected);
  });

  it("COUNTER_RESET", () => {
    const action = {
      type: COUNTER_RESET
    };
    const state = 150;
    const expected = 0;
    expect(reducer(state, action)).toEqual(expected);
  });

  it("COUNTER_SET", () => {
    const expected = 666;
    const action = {
      type: COUNTER_SET,
      payload: { number: expected }
    };
    const state = 0;
    expect(reducer(state, action)).toEqual(expected);
  });
});
