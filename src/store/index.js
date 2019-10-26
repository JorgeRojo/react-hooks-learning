import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from '../reducer';
import reduxActionsDispatchersGenerator from './reduxActionsDispatchersGenerator';

const initialState = {};
const middleware = [thunk];
const composeEnhancers = composeWithDevTools({});

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;

export const reduxActionsDispatchers = reduxActionsDispatchersGenerator(store);
