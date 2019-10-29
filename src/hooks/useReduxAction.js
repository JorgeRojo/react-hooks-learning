import { useCallback } from 'react';
import store from '../store';

const useReduxAction = actionCreator =>
  useCallback(
    (...params) => {
      return store.dispatch(actionCreator(...params));
    },
    [actionCreator]
  );

export default useReduxAction;
