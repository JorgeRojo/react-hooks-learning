import reduxActionsDispatchersGenerator from '../reduxActionsDispatchersGenerator';
import store from '../index';

jest.mock('../index', () => require('../__mocks__/mockStore'));

describe('reduxActionsDispatchersGenerator', () => {
  let dispatchSpy;
  let reduxActionsDispatchers;

  beforeEach(() => {
    dispatchSpy = jest.spyOn(store, 'dispatch');
    reduxActionsDispatchers = reduxActionsDispatchersGenerator(store);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('without actionCreators list', () => {
    const reduxActions = reduxActionsDispatchers();
    expect(reduxActions).toEqual({});
  });

  it('with actionCreators list', () => {
    const actionValue = { type: 'ACTION', payload: { foo: 'bar' } };

    const { dispatchAction1 } = reduxActionsDispatchers({
      action1: jest.fn().mockReturnValue(actionValue),
    });

    expect(dispatchAction1()).toEqual(actionValue);
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(actionValue);
  });
});
