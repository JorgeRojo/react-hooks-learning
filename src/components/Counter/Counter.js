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

const Counter = () => {
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
      <h2>Counter: {counter}</h2>
      <hr />
      <button onClick={handleClickIncrease}>+ 1</button>

      <span> | </span>
      <button onClick={handleClickDecrease}>- 1</button>

      <span> | </span>
      <button onClick={handleClickReset}>= 0</button>

      <span> | </span>
      <button onClick={handleClickSet}> = </button>
      <input
        value={number}
        onKeyPress={handleKeyPressSet}
        onChange={handleChangeNumber}
        type="text"
      />

      <span> | </span>
      <input value={counter} onChange={handleChangeSet} type="text" />
    </>
  );
};

export default Counter;
