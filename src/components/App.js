import React from "react";
import { Provider } from "react-redux";
import store from "../store";

import Counter from "./Counter/Counter.js";

function App() {
  return (
    <Provider store={store}>
      <h1>App title</h1>
      <Counter />
    </Provider>
  );
}

export default App;
