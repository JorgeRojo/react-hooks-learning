import withReduxDispatchGenerator from '../withReduxDispatchGenerator';
import store from '../index';

jest.mock('../index', () => require('../___mocks___/mockStore'));

describe('withReduxDispatchGenerator', () => {
  let dispatchSpy;
  let withReduxDispatch;

  beforeEach(() => {
    dispatchSpy = jest.spyOn(store, 'dispatch');
    withReduxDispatch = withReduxDispatchGenerator(store);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('without actionCreators list', () => {
    const reduxActions = withReduxDispatch();
    expect(reduxActions).toEqual({});
  });

  it('with actionCreators list', () => {
    const actionValue = { type: 'ACTION', payload: { foo: 'bar' } };

    const reduxActions = withReduxDispatch({
      actionCreator1: jest.fn().mockReturnValue(actionValue),
    });

    const actual = reduxActions.actionCreator1();

    expect(actual).toEqual(actionValue);
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(actionValue);
  });
});
