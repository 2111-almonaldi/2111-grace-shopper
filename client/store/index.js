import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import productsReducer from "./products";
import axios from 'axios';
import singleProductReducer from "./singleProduct";

const reducer = combineReducers({
  auth,
  products: productsReducer,
  singleProduct: singleProductReducer,
});

let middleware = [
  thunkMiddleware.withExtraArgument({axios})
]

middleware = [...middleware, createLogger({ collapsed: true })]

const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
export * from "./auth";
