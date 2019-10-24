const withReduxDispatchGenerator = store => (actions = {}) =>
  Object.keys(actions).reduce((wrappers, actionName) => {
    wrappers[actionName] = params =>
      store.dispatch(actions[actionName](params));
    return wrappers;
  }, {});

export default withReduxDispatchGenerator;
