import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducer from "../reducer";

const initialState = {};
const middleware = [thunk];
const composeEnhancers = composeWithDevTools({});

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;

export const withReduxDispatch = (actions = {}) => {
  return Object.keys(actions).reduce((wrappers, actionName) => {
    wrappers[actionName] = params =>
      store.dispatch(actions[actionName](params));
    return wrappers;
  }, {});
};
