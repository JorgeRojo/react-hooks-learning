import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getNumberFromEvent } from '../../../../helpers/utils';
import CounterFormView from './CounterFormView';

import { counterSet } from '../../../../actions/counterActions';
import { selectCounter } from '../../../../reducer';

class CounterForm extends Component {
  constructor(props) {
    super(props);

    this.state = { number: props.counter };

    this.handleChangeNumber = this.handleChangeNumber.bind(this);
    this.handleClickSet = this.handleClickSet.bind(this);
    this.handleKeyPressSet = this.handleKeyPressSet.bind(this);
    this.handleChangeSet = this.handleChangeSet.bind(this);
  }

  handleChangeNumber(event) {
    this.setState({ number: getNumberFromEvent(event) });
  }

  handleClickSet() {
    this.props.counterSet(this.state.number);
  }

  handleKeyPressSet({ key }) {
    if (key === 'Enter') {
      this.props.counterSet(this.state.number);
    }
  }

  handleChangeSet(event) {
    this.props.counterSet(getNumberFromEvent(event));
  }

  render() {
    return (
      <CounterFormView
        counter={this.props.counter}
        handleChangeNumber={this.handleChangeNumber}
        handleChangeSet={this.handleChangeSet}
        handleClickSet={this.handleClickSet}
        handleKeyPressSet={this.handleKeyPressSet}
        number={this.state.number}
      />
    );
  }
}

const mapStateToProps = state => ({
  counter: selectCounter(state),
});

export default connect(
  mapStateToProps,
  {
    counterSet,
  }
)(CounterForm);
