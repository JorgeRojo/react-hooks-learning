import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { selectCounter } from '../../reducer';

const CounterHeader = () => {
  const counter = useSelector(selectCounter, shallowEqual);
  return <h1>Counter: {counter}</h1>;
};

export default CounterHeader;
