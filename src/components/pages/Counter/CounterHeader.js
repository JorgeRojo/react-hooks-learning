import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { selectCounter } from '../../../reducer';

const CounterHeader = () => {
  const counter = useSelector(selectCounter, shallowEqual);
  return <h1 className="display-4 mb-4">Counter: {counter}</h1>;
};

export default CounterHeader;
