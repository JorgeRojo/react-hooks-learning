import React, { useEffect } from 'react';
import { render, cleanup } from '@testing-library/react';
import store from '../../store/index';
import useReduxAction from '../useReduxAction';

jest.mock('../../store/index', () =>
  require('../../store/__mocks__/mockStore')
);

describe('useReduxAction', () => {
  let dispatchSpy;
  let component;

  const param1 = 'value1';
  const param2 = 'value2';
  const actionValue = { type: 'ACTION_1', payload: { param1, param2 } };

  beforeEach(() => {
    dispatchSpy = jest.spyOn(store, 'dispatch');

    const actionCreator = jest.fn().mockReturnValue(actionValue);
    const sendIteration = jest.fn().mockImplementation(iteration => ({
      type: 'ACTION_2',
      payload: iteration,
    }));

    const MockComponent = ({ iteration }) => {
      const dispatchActionCreator = useReduxAction(actionCreator);
      const dispatchSendIteration = useReduxAction(sendIteration);

      useEffect(() => {
        dispatchActionCreator(param1, param2);
      }, [dispatchActionCreator]);

      useEffect(() => {
        dispatchSendIteration(iteration);
      }, [dispatchSendIteration, iteration]);

      return <code>{iteration}</code>;
    };

    component = props => <MockComponent {...props} />;
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('dispatch two actionCreators with several parameters', () => {
    const { rerender } = render(component({ iteration: 1 }));
    rerender(component({ iteration: 2 }));
    rerender(component({ iteration: 3 }));

    expect(dispatchSpy).toHaveBeenCalledTimes(4);

    expect(dispatchSpy).toHaveBeenCalledWith(actionValue);
    expect(dispatchSpy).toHaveBeenCalledWith({ type: 'ACTION_2', payload: 1 });
    expect(dispatchSpy).toHaveBeenCalledWith({ type: 'ACTION_2', payload: 2 });
    expect(dispatchSpy).toHaveBeenCalledWith({ type: 'ACTION_2', payload: 3 });
  });
});
