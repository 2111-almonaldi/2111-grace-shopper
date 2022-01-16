import axios from "axios";
import { clearCart } from "./cart";

const CREATE_ORDER = "CREATE_ORDER";
const CLEAR_ORDER = "CLEAR_ORDER";
const FETCH_ORDERS = "FETCH_ORDERS";

const _createOrder = (order) => ({
  type: CREATE_ORDER,
  order,
});

const _clearOrder = () => ({
  type: CLEAR_ORDER,
});

const setOrders = (orders) => ({
  type: FETCH_ORDERS,
  orders,
});

export const createOrder = (order) => {
  return async (dispatch) => {
    try {
      const { data: created } = await axios.post("/api/orders", order);
      dispatch(_createOrder(created));
      window.localStorage.clear("cart");
      dispatch(clearCart);
    } catch (error) {
      console.log(error, "order creation error");
    }
  };
};

export const clearOrder = () => (dispatch) => {
  dispatch(_clearOrder());
};
export const fetchOrders = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/orders");
      dispatch(setOrders(data));
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = {};

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_ORDER:
      return { order: action.order };
    case CLEAR_ORDER:
      return { order: null };
    case FETCH_ORDERS:
      return { orders: action.orders };
    default:
      return state;
  }
}
