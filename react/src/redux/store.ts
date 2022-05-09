import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReduser from "./reducers";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReduser, composeEnhancers(applyMiddleware(thunk)));
export default store;