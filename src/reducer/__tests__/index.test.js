import { selectCounter } from "../index";
import mockState from "../../store/___mocks___/mockState";

describe("Reducer", () => {
  it("selectCounter", () => {
    const expected = 0;
    const actual = selectCounter(mockState);
    expect(actual).toEqual(expected);
  });
});

describe("Selectors", () => {
  it("selectCounter", () => {
    const expected = 0;
    const actual = selectCounter(mockState);
    expect(actual).toEqual(expected);
  });
});
