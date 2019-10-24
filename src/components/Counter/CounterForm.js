import React, { useCallback, useState, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { withReduxDispatch } from "../../store";

import * as counterActions from "../../actions/counterActions";
import { selectCounter } from "../../reducer";

import { getNumberFromEvent } from "./counterHelpers";

const {
  counterIncrease,
  counterDecrease,
  counterSet,
  counterReset
} = withReduxDispatch(counterActions);

const CounterForm = () => {
  const counter = useSelector(selectCounter, shallowEqual);

  const [number, setNumber] = useState(counter);

  useEffect(() => {
    setNumber(counter);
  }, [counter]);

  const handleChangeNumber = useCallback(event => {
    setNumber(getNumberFromEvent(event));
  }, []);

  const handleClickSet = useCallback(() => {
    counterSet(number);
  }, [number]);

  const handleKeyPressSet = useCallback(
    ({ key }) => {
      if (key === "Enter") {
        counterSet(number);
      }
    },
    [number]
  );

  const handleChangeSet = useCallback(event => {
    counterSet(getNumberFromEvent(event));
  }, []);

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

export default CounterForm;
