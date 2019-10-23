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

  const handleClickIncrease = useCallback(() => {
    counterIncrease();
  }, []);

  const handleClickDecrease = useCallback(() => {
    counterDecrease();
  }, []);

  const handleClickReset = useCallback(() => {
    counterReset();
  }, []);

  const handleChangeNumber = useCallback(event => {
    setNumber(getNumberFromEvent(event));
  }, []);

  const handleClickSet = useCallback(() => {
    counterSet(number);
  }, [number]);

  const handleKeyPressSet = useCallback(
    ({ key }) => {
      if (key === "Enter") {
        handleClickSet();
      }
    },
    [handleClickSet]
  );

  const handleChangeSet = useCallback(event => {
    counterSet(getNumberFromEvent(event));
  }, []);

  return (
    <>
      <p>
        <button onClick={handleClickIncrease}>+ 1</button>

        <span> | </span>
        <button onClick={handleClickDecrease}>- 1</button>

        <span> | </span>
        <button onClick={handleClickReset}>= 0</button>
      </p>

      <p>
        <input
          value={number}
          onKeyPress={handleKeyPressSet}
          onChange={handleChangeNumber}
          type="text"
        />
        <button onClick={handleClickSet}> SET </button>
      </p>

      <p>
        <label htmlFor="number-live"> counter = </label>
        <input
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
