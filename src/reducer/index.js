import { combineReducers } from "redux";
import counter from "./counter";
import * as fromCounter from "./counter";

const reducer = {
  counter
};

export default combineReducers(reducer);

export const selectCounter = state => fromCounter.selectCounter(state.counter);
