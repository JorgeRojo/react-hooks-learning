import {
  COUNTER_DECREASE,
  COUNTER_INCREASE,
  COUNTER_RESET,
  COUNTER_SET,
} from './actionTypes';

export const counterDecrease = () => ({
  type: COUNTER_DECREASE,
});

export const counterIncrease = () => ({
  type: COUNTER_INCREASE,
});

export const counterReset = () => ({
  type: COUNTER_RESET,
});

export const counterSet = number => ({
  type: COUNTER_SET,
  payload: { number },
});
