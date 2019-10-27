import { selectCounter } from '../index';
import mockState from '../../store/__mocks__/mockState';

describe('Selectors', () => {
  it('selectCounter', () => {
    const expected = 0;
    const actual = selectCounter(mockState);
    expect(actual).toEqual(expected);
  });
});
