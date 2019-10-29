import {
  POSTS_ERROR,
  POSTS_REQUEST,
  POSTS_RESET,
  POSTS_SUCCESS,
} from '../../../actions/actionTypes';

import reducer from '../index';

describe('posts reducer', () => {
  const defaultState = {
    response: {},
    isLoading: false,
  };

  it('Default', () => {
    const action = {};
    const expected = defaultState;
    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('POSTS_RESET', () => {
    const action = { type: POSTS_RESET };
    const state = { response: { foo: 'bar' }, isLoading: true };
    const expected = defaultState;
    expect(reducer(state, action)).toEqual(expected);
  });

  it('POSTS_REQUEST', () => {
    const action = {
      type: POSTS_REQUEST,
    };
    const state = { ...defaultState };
    const expected = { ...defaultState, isLoading: true };
    expect(reducer(state, action)).toEqual(expected);
  });

  it('POSTS_SUCCESS', () => {
    const response = { foo: 'bar' };
    const action = {
      type: POSTS_SUCCESS,
      payload: { response },
    };
    const state = { ...defaultState };
    const expected = { response, isLoading: false };
    expect(reducer(state, action)).toEqual(expected);
  });

  it('POSTS_ERROR', () => {
    const response = { foo: 'bar' };
    const action = {
      type: POSTS_ERROR,
    };
    const state = { response, isLoading: true };
    const expected = { response, isLoading: false };
    expect(reducer(state, action)).toEqual(expected);
  });
});
