import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';

import CounterHeader from './Counter/CounterHeader';
import CounterForm from './Counter/CounterForm/CounterForm';

function App() {
  return (
    <Provider store={store}>
      <CounterHeader foo="var" />
      <CounterForm />
    </Provider>
  );
}

export default App;
