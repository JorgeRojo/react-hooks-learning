import React from 'react';

import {
  counterIncrease,
  counterDecrease,
  counterReset,
} from '../../../../actions/counterActions';
import useReduxAction from '../../../../hooks/useReduxAction';

import { areShallowDiffProps } from '../../../../helpers/utils';

const CounterFormView = ({
  counter,
  handleChangeNumber,
  handleChangeSet,
  handleClickSet,
  handleKeyPressSet,
  number,
}) => {
  const dispatchCounterIncrease = useReduxAction(counterIncrease);
  const dispatchCounterDecrease = useReduxAction(counterDecrease);
  const dispatchCounterReset = useReduxAction(counterReset);

  return (
    <div className="card bg-light">
      <p className="card-header lead">{`counter_${counter}_number_${number}`}</p>
      <div className="card-body">
        <p className="input-group">
          <button
            className="btn btn-primary mx-1 px-4"
            aria-label="counterIncreaseBtn"
            onClick={dispatchCounterIncrease}
          >
            + 1
          </button>

          <button
            className="btn btn-primary mx-1 px-4"
            aria-label="counterDecreaseBtn"
            onClick={dispatchCounterDecrease}
          >
            - 1
          </button>

          <button
            className="btn btn-primary mx-1 px-4"
            aria-label="counterResetBtn"
            onClick={dispatchCounterReset}
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
};

export default React.memo(
  CounterFormView,
  areShallowDiffProps(['counter', 'number'])
);
