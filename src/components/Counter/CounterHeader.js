import React from 'react';
import { connect } from 'react-redux';
import { selectCounter } from '../../reducer';

const CounterHeader = ({ counter }) => {
  return <h1>Counter: {counter}</h1>;
};

const mapStateToProps = state => ({
  counter: selectCounter(state),
});

export default connect(mapStateToProps)(CounterHeader);
