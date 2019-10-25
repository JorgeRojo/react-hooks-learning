import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import {
  counterIncrease,
  counterDecrease,
  counterSet,
  counterReset,
} from '../../actions/counterActions';
import { selectCounter } from '../../reducer';

import { getNumberFromEvent } from './counterHelpers';

class CounterForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      number: props.counter,
    };

    this.handleChangeNumber = this.handleChangeNumber.bind(this);
    this.handleClickSet = this.handleClickSet.bind(this);
    this.handleKeyPressSet = this.handleKeyPressSet.bind(this);
    this.handleChangeSet = this.handleChangeSet.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { counter } = this.props;
    if (prevProps.counter !== counter) {
      this.setState({
        number: counter,
      });
    }
  }

  handleChangeNumber(event) {
    this.setState({
      number: getNumberFromEvent(event),
    });
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
    const {
      counter,
      counterIncrease,
      counterDecrease,
      counterReset,
    } = this.props;
    const { number } = this.state;

    return (
      <>
        <p>
          <button aria-label="counterIncreaseBtn" onClick={counterIncrease}>
            + 1
          </button>

          <span> | </span>
          <button aria-label="counterDecreaseBtn" onClick={counterDecrease}>
            - 1
          </button>

          <span> | </span>
          <button aria-label="counterResetBtn" onClick={counterReset}>
            = 0
          </button>
        </p>

        <p>
          <input
            aria-label="handleChangeNumberInput"
            value={number}
            onKeyPress={this.handleKeyPressSet}
            onChange={this.handleChangeNumber}
            type="text"
          />
          <button aria-label="handleClickSetBtn" onClick={this.handleClickSet}>
            SET
          </button>
        </p>

        <p>
          <label htmlFor="number-live"> counter = </label>
          <input
            aria-label="handleChangeSetInput"
            id="number-live"
            value={counter}
            onChange={this.handleChangeSet}
            type="text"
          />
        </p>
      </>
    );
  }
}

const mapStateToProps = state => ({
  counter: selectCounter(state),
});

const mapDispatchToProps = {
  counterIncrease,
  counterDecrease,
  counterSet,
  counterReset,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CounterForm);
