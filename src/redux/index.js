import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import thunkMiddleware from "redux-thunk";
import { createBrowserHistory } from "history";

import authReducer from "./auth/reducer";
import alertReducer from "./alert/reducer";

export const history = createBrowserHistory();

const createReducer = history =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    alert: alertReducer
  });

export default function configureStore(preloadedState) {
  const composeEnhancers =
    (typeof window !== "undefined" &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
  const middlewares = [routerMiddleware(history), thunkMiddleware];
  const store = createStore(
    createReducer(history),
    preloadedState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  return store;
}
