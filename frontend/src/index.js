import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import "./index.css";
import App from "./App";
import history from "./history";
import rootReducer from "./reducers/index";

const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk), composeWithDevTools())
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
