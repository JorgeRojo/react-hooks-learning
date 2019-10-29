import React, { useEffect } from 'react';
import CounterHeader from './CounterHeader';
import CounterForm from './CounterForm/CounterForm';

import { counterReset } from '../../../actions/counterActions';
import useReduxAction from '../../../hooks/useReduxAction';

const Counter = () => {
  const dispatchCounterReset = useReduxAction(counterReset);
  useEffect(() => dispatchCounterReset);

  return (
    <div className="container text-center mt-4">
      <CounterHeader />
      <CounterForm />
    </div>
  );
};

export default Counter;
