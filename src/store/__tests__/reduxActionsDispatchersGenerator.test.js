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

  it('dispatch actionCreator with several parameters', () => {
    const param1 = 'value1';
    const param2 = 'value2';
    const actionValue = { type: 'ACTION', payload: { param1, param2 } };
    const actionCreator = jest.fn().mockReturnValue(actionValue);
    const { dispatchActionCreator } = reduxActionsDispatchers({
      actionCreator,
    });
    dispatchActionCreator(param1, param2);
    expect(actionCreator).toHaveBeenCalledTimes(1);
    expect(actionCreator).toHaveBeenCalledWith(param1, param2);
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(actionValue);
  });
});
