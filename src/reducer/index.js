import { combineReducers } from 'redux';
import posts from './posts';
import counter from './counter';

import * as fromCounter from './counter';
import * as fromApi from './posts';

const reducer = {
  posts,
  counter,
};

export default combineReducers(reducer);

// Selectors

export const selectCounter = state => fromCounter.selectCounter(state.counter);

export const selectPostsList = state => fromApi.selectPostsList(state.posts);

export const selectPostsIsLoading = state =>
  fromApi.selectPostsIsLoading(state.posts);
