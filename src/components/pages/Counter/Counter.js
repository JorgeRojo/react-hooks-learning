import React, { Component } from 'react';
import { connect } from 'react-redux';
import CounterHeader from './CounterHeader';
import CounterForm from './CounterForm/CounterForm';

import { counterReset } from '../../../actions/counterActions';

class Counter extends Component {
  componentWillUnmount() {
    this.props.counterReset();
  }

  render() {
    return (
      <div className="container text-center mt-4">
        <CounterHeader />
        <CounterForm />
      </div>
    );
  }
}

export default connect(
  null,
  {
    counterReset,
  }
)(Counter);
