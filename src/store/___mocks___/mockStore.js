import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import mockState from "./mockState";
import withReduxDispatchGenerator from "../withReduxDispatchGenerator";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

const store = mockStore(mockState);

export default store;

export const withReduxDispatch = withReduxDispatchGenerator(store);
