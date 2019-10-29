import _upperFirst from 'lodash/upperFirst';

const reduxActionsDispatchersGenerator = ({ dispatch }) => (
  actionsNames = {}
) =>
  Object.keys(actionsNames).reduce(
    (actions, actionName) => ({
      ...actions,
      [`dispatch${_upperFirst(actionName)}`]: (...actionParams) =>
        dispatch(actionsNames[actionName](...actionParams)),
    }),
    {}
  );

export default reduxActionsDispatchersGenerator;
