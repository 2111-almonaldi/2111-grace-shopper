import axios from "axios";
import { clearCart } from "./cart";

const CREATE_ORDER = "CREATE_ORDER";
const CLEAR_ORDER = "CLEAR_ORDER";
const FETCH_ORDERS = "FETCH_ORDERS";
const UPDATE_ORDER = "UPDATE_ORDER";

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

export const _updateOrder = (order) => ({
  type: UPDATE_ORDER,
  order,
});

export const createOrder = (order) => {
  return async (dispatch) => {
    try {
      const { data: created } = await axios.post("/api/orders", order);
      dispatch(_createOrder(created));
    } catch (error) {
      console.log(error, "order creation error");
    }
  };
};

export const logoutOrder = () => {
  return async (dispatch, getState) => {
    try {
      const orderItems = getState().cart.cartItems;
      const userId = getState().auth.id;
      const order = getState().orders.order;
      if (orderItems.length !== 0 && Object.keys(order).length !== 0) {
        const id = order.id;
        const { data } = await axios.put(`/api/orders/${id}`, {
          items: orderItems,
          id,
        });
      } else if (orderItems.length !== 0) {
        const { data: created } = await axios.post("/api/orders", {
          items: orderItems,
          userId,
        });
      }
      dispatch(clearOrder());
      dispatch(clearCart());
    } catch (error) {
      console.log(error);
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

export const updateOrder = (order) => {
  return async (dispatch) => {
    try {
      const { data: updated } = await axios.put(
        `/api/orders/${order.id}`,
        order
      );
      dispatch(_updateOrder(updated));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteOrder = (id) => {
  return async (dispatch) => {
    try {
      const { data: order } = await axios.delete(`/api/orders/${id}`);
      dispatch(_clearOrder());
    } catch (error) {
      console.log(error);
    }
  };
};

export const loadPending = () => {
  return async (dispatch, getState) => {
    try {
      const id = getState().auth.id;
      const { data: pending } = await axios.get(`/api/orders/${id}/pending`);
      return dispatch(setOrders(pending));
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = {
  orders: [],
  order: {},
};

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_ORDER:
      return { ...state, order: action.order };
    case CLEAR_ORDER:
      return { ...state, order: {} };
    case FETCH_ORDERS:
      return { ...state, orders: action.orders };
    case UPDATE_ORDER:
      return { ...state, order: action.order };
    default:
      return state;
  }
}
