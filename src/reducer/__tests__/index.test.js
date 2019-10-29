import { selectCounter, selectPostsList, selectPostsIsLoading } from '../index';
import mockState from '../../store/__mocks__/mockState';

describe('Selectors', () => {
  it('selectCounter', () => {
    const expected = 0;
    const actual = selectCounter(mockState);
    expect(actual).toEqual(expected);
  });

  it('selectPostsList', () => {
    const expected = mockState.posts.response.data;
    const actual = selectPostsList(mockState);
    expect(actual).toEqual(expected);
  });

  it('selectPostsIsLoading', () => {
    const expected = false;
    const actual = selectPostsIsLoading(mockState);
    expect(actual).toEqual(expected);
  });
});
