import _upperFirst from 'lodash/upperFirst';

const reduxActionsDispatchersGenerator = store => (actionsNames = {}) =>
  Object.keys(actionsNames).reduce(
    (actions, actionName) => ({
      ...actions,
      [`dispatch${_upperFirst(actionName)}`]: params =>
        store.dispatch(actionsNames[actionName](params)),
    }),
    {}
  );

export default reduxActionsDispatchersGenerator;
