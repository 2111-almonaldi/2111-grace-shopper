import axios from "axios";
import { clearCart } from "./cart";

const CREATE_ORDER = "CREATE_ORDER";
const CLEAR_ORDER = "CLEAR_ORDER";
const FETCH_ORDERS = "FETCH_ORDERS";
const UPDATE_ORDER = "UPDATE_ORDER";
const LOGOUT_ORDER = "LOGOUT_ORDER";

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
      window.localStorage.clear("cart");
      dispatch(clearCart);
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
      if (!getState().orders.order) {
        if (orderItems.length) {
          const { data: created } = await axios.post("/api/orders", {
            items: orderItems,
            userId,
          });
        }
      } else {
        const id = getState().orders.order.id;
        const { data: updated } = await axios.put(`/api/orders/${id}`, {
          items: orderItems,
          id,
        });
      }
      return dispatch(clearOrder());
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

const initialState = {};

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_ORDER:
      return { order: action.order };
    case CLEAR_ORDER:
      return { order: null };
    case FETCH_ORDERS:
      return { orders: action.orders };
    case UPDATE_ORDER:
      return {
        orders: state.map((order) =>
          order.id === action.order.id ? action.order : order
        ),
      };
    default:
      return state;
  }
}
