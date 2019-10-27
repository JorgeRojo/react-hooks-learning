import _get from 'lodash/get';

import {
  API_ERROR,
  API_REQUEST,
  API_RESET,
  API_SUCCESS,
} from '../../actions/actionTypes';

const defaultState = {
  response: {},
  isLoading: false,
};

const apiReducer = (state = defaultState, action) => {
  switch (action.type) {
    case API_RESET:
      return defaultState;
    case API_REQUEST:
      return { ...defaultState, isLoading: true };
    case API_ERROR:
      return { ...defaultState, isLoading: false };
    case API_SUCCESS:
      return {
        response: action.payload.response,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default apiReducer;

// Selectors

export const selectApiData = state => _get(state, 'response.data', []);

export const selectApiIsLoading = state => state.isLoading;
