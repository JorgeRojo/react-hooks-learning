import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  counterIncrease,
  counterDecrease,
  counterReset,
} from '../../../../actions/counterActions';

class CounterFormView extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.counter !== nextProps.counter) {
      return true;
    }
    if (this.props.number !== nextProps.number) {
      return true;
    }
    return false;
  }

  render() {
    const {
      counter,
      counterDecrease,
      counterIncrease,
      counterReset,
      handleChangeNumber,
      handleChangeSet,
      handleClickSet,
      handleKeyPressSet,
      number,
    } = this.props;

    return (
      <div className="card bg-light">
        <p className="card-header lead">{`counter_${counter}_number_${number}`}</p>
        <div className="card-body">
          <p className="input-group">
            <button
              className="btn btn-primary mx-1 px-4"
              aria-label="counterIncreaseBtn"
              onClick={counterIncrease}
            >
              + 1
            </button>

            <button
              className="btn btn-primary mx-1 px-4"
              aria-label="counterDecreaseBtn"
              onClick={counterDecrease}
            >
              - 1
            </button>

            <button
              className="btn btn-primary mx-1 px-4"
              aria-label="counterResetBtn"
              onClick={counterReset}
            >
              = 0
            </button>
          </p>

          <p className="input-group">
            <input
              aria-label="handleChangeNumberInput"
              className="form-control"
              value={number}
              onKeyPress={handleKeyPressSet}
              onChange={handleChangeNumber}
              type="text"
            />
            <span className="input-group-append">
              <button
                className="btn btn-primary  px-4"
                aria-label="handleClickSetBtn"
                onClick={handleClickSet}
              >
                SET
              </button>
            </span>
          </p>

          <p className="input-group">
            <span className="input-group-prepend">
              <label className="input-group-text" htmlFor="number-live">
                counter =
              </label>
            </span>
            <input
              aria-label="handleChangeSetInput"
              className="form-control"
              id="number-live"
              value={counter}
              onChange={handleChangeSet}
              type="text"
            />
          </p>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  {
    counterIncrease,
    counterDecrease,
    counterReset,
  }
)(CounterFormView);
