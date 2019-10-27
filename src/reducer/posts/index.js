import _get from 'lodash/get';

import {
  POSTS_ERROR,
  POSTS_REQUEST,
  POSTS_RESET,
  POSTS_SUCCESS,
} from '../../actions/actionTypes';

const defaultState = {
  response: {},
  isLoading: false,
};

const postsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case POSTS_RESET:
      return defaultState;
    case POSTS_REQUEST:
      return { ...defaultState, isLoading: true };
    case POSTS_ERROR:
      return { ...defaultState, isLoading: false };
    case POSTS_SUCCESS:
      return {
        response: action.payload.response,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default postsReducer;

// Selectors

export const selectPostsList = state => _get(state, 'response.data', []);

export const selectPostsIsLoading = state => state.isLoading;
