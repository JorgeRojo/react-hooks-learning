import React from 'react';
import { connect } from 'react-redux';
import { selectCounter } from '../../../reducer';

const CounterHeader = ({ counter }) => {
  return <h1 className="display-4 mb-4">Counter: {counter}</h1>;
};

const mapStateToProps = state => ({
  counter: selectCounter(state),
});

export default connect(mapStateToProps)(CounterHeader);
