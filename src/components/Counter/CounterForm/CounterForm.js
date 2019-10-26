import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { reduxActionsDispatchers } from '../../../store';

import * as counterActions from '../../../actions/counterActions';
import { selectCounter } from '../../../reducer';

import { getNumberFromEvent } from '../../../helpers/utils';

import CounterFormView from './CounterFormView';

const { dispatchCounterSet } = reduxActionsDispatchers(counterActions);

const CounterForm = () => {
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
  }, [number]);

  const handleKeyPressSet = useCallback(
    ({ key }) => {
      if (key === 'Enter') {
        dispatchCounterSet(number);
      }
    },
    [number]
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
