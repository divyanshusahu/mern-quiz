import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};
const middleware = [thunk];
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    // eslint-disable-next-line
    (window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE &&
      window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE()) ||
      compose
  )
);

export default store;
