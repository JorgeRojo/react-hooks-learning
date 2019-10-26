import React from 'react';
import { areShallowDiffProps } from '../../../helpers/utils';
import * as counterActions from '../../../actions/counterActions';
import { reduxActionsDispatchers } from '../../../store';

const {
  dispatchCounterIncrease,
  dispatchCounterDecrease,
  dispatchCounterReset,
} = reduxActionsDispatchers(counterActions);

const CounterFormView = ({
  counter,
  handleChangeNumber,
  handleChangeSet,
  handleClickSet,
  handleKeyPressSet,
  number,
}) => {
  return (
    <>
      <p>{`counter_${counter}_number_${number}`}</p>
      <p>
        <button
          aria-label="counterIncreaseBtn"
          onClick={dispatchCounterIncrease}
        >
          + 1
        </button>

        <span> | </span>
        <button
          aria-label="counterDecreaseBtn"
          onClick={dispatchCounterDecrease}
        >
          - 1
        </button>

        <span> | </span>
        <button aria-label="counterResetBtn" onClick={dispatchCounterReset}>
          = 0
        </button>
      </p>

      <p>
        <input
          aria-label="handleChangeNumberInput"
          value={number}
          onKeyPress={handleKeyPressSet}
          onChange={handleChangeNumber}
          type="text"
        />
        <button aria-label="handleClickSetBtn" onClick={handleClickSet}>
          SET
        </button>
      </p>

      <p>
        <label htmlFor="number-live"> counter = </label>
        <input
          aria-label="handleChangeSetInput"
          id="number-live"
          value={counter}
          onChange={handleChangeSet}
          type="text"
        />
      </p>
    </>
  );
};

export default React.memo(
  CounterFormView,
  areShallowDiffProps(['counter', 'number'])
);
