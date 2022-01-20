import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import productsReducer from './products';
import axios from 'axios';
import singleProductReducer from './singleProduct';
import cartReducer from './cart';
import orderReducer from './order';
import admin from './adminInfo';
import errors from './errors';

const reducer = combineReducers({
	auth,
	products: productsReducer,
	singleProduct: singleProductReducer,
	cart: cartReducer,
	orders: orderReducer,
	admin,
	errors
});

let middleware = [thunkMiddleware.withExtraArgument({ axios })];

middleware = [...middleware, createLogger({ collapsed: true })];

const store = createStore(
	reducer,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
export * from './auth';
