import { combineReducers } from 'redux';
import api from './posts';
import counter from './counter';

import * as fromCounter from './counter';
import * as fromApi from './posts';

const reducer = {
  api,
  counter,
};

export default combineReducers(reducer);

// Selectors

export const selectCounter = state => fromCounter.selectCounter(state.counter);

export const selectPostsList = state => fromApi.selectPostsList(state.api);

export const selectPostsIsLoading = state =>
  fromApi.selectPostsIsLoading(state.api);
