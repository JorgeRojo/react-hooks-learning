import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { selectCounter } from '../../../../reducer';

import { counterSet } from '../../../../actions/counterActions';
import useReduxAction from '../../../../hooks/useReduxAction';

import { getNumberFromEvent } from '../../../../helpers/utils';

import CounterFormView from './CounterFormView';

const CounterForm = () => {
  const dispatchCounterSet = useReduxAction(counterSet);

  const counter = useSelector(selectCounter, shallowEqual);

  const [number, setNumber] = useState(counter);

  useEffect(() => {
    setNumber(counter);
  }, [counter]);

  const handleChangeNumber = useCallback(event => {
    setNumber(getNumberFromEvent(event));
  }, []);

  const handleClickSet = useCallback(() => {
    dispatchCounterSet(number);
  }, [number, dispatchCounterSet]);

  const handleKeyPressSet = useCallback(
    ({ key }) => {
      if (key === 'Enter') {
        dispatchCounterSet(number);
      }
    },
    [number, dispatchCounterSet]
  );

  const handleChangeSet = useCallback(event => {
    dispatchCounterSet(getNumberFromEvent(event));
  }, []);

  return (
    <CounterFormView
      {...{
        counter,
        handleChangeNumber,
        handleChangeSet,
        handleClickSet,
        handleKeyPressSet,
        number,
      }}
    />
  );
};

export default CounterForm;
