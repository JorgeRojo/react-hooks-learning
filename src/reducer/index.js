import { combineReducers } from 'redux';
import api from './api';
import counter from './counter';

import * as fromCounter from './counter';
import * as fromApi from './api';

const reducer = {
  api,
  counter,
};

export default combineReducers(reducer);

// Selectors

export const selectCounter = state => fromCounter.selectCounter(state.counter);

export const selectApiData = state => fromApi.selectApiData(state.api);

export const selectApiIsLoading = state =>
  fromApi.selectApiIsLoading(state.api);
