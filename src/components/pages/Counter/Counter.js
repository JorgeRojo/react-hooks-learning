import React, { useEffect } from 'react';
import CounterHeader from './CounterHeader';
import CounterForm from './CounterForm/CounterForm';

import { reduxActionsDispatchers } from '../../../store';
import { counterReset } from '../../../actions/counterActions';
const { dispatchCounterReset } = reduxActionsDispatchers({ counterReset });

const Counter = () => {
  useEffect(() => dispatchCounterReset);

  return (
    <div className="container text-center mt-4">
      <CounterHeader />
      <CounterForm />
    </div>
  );
};

export default Counter;
