import {
  COUNTER_DECREASE,
  COUNTER_INCREASE,
  COUNTER_RESET,
  COUNTER_SET
} from "../../actions/actionTypes";

const defaultState = 0;

const counterReducer = (state = defaultState, action) => {
  switch (action.type) {
    case COUNTER_DECREASE:
      return (state = state - 1);
    case COUNTER_INCREASE:
      return (state = state + 1);
    case COUNTER_RESET:
      return defaultState;
    case COUNTER_SET:
      return action.payload.number;
    default:
      return state;
  }
};

export default counterReducer;

export const selectCounter = state => state;
