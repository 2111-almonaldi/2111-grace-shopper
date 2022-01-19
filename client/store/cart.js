import axios from "axios";
import { createOrder, updateOrder, deleteOrder } from "./order";

const SET_CART = "SET_CART";
const ADD_TO_CART = "ADD_TO_CART";
const DECREASE_ITEM = "DECREASE_ITEM";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";

export const setCart = (cart) => ({
  type: SET_CART,
  cart,
});

export const addItem = (cart) => ({
  type: ADD_TO_CART,
  cart,
});

export const _decreaseItem = (cart) => ({
  type: DECREASE_ITEM,
  cart,
});

export const removeItem = (cart) => ({
  type: REMOVE_FROM_CART,
  cart,
});

export const fetchCart = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/cart", { userId });
      dispatch(setCart(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const clearCart = () => (dispatch, getState) => {
  dispatch(setCart([]));
  window.localStorage.setItem("cart", JSON.stringify([]));
};

export const addToCart = (product) => (dispatch, getState) => {
  const cartItems = getState().cart.cartItems.slice();
  const userId = getState().auth.id;
  let inCart = false;
  cartItems.forEach((item) => {
    if (item.name === product.name) {
      inCart = true;
      item.count++;
    }
  });
  if (!inCart) {
    cartItems.push({ ...product, count: 1 });
  }
  dispatch(addItem(cartItems));
  const order = getState().orders.order;
  if (userId) {
    if (cartItems.reduce((a, c) => a + c.count, 0) === 1 || !order) {
      dispatch(createOrder({ items: cartItems, userId }));
    } else {
      const id = getState().orders.order.id;
      dispatch(updateOrder({ id, items: cartItems }));
    }
  }
  window.localStorage.setItem("cart", JSON.stringify(cartItems));
};

export const decreaseItem = (product) => (dispatch, getState) => {
  const userId = getState().auth.id;
  const id = getState().orders.order.id;

  if (product.count === 1) {
    const cartItems = getState()
      .cart.cartItems.slice()
      .filter((item) => item.name !== product.name);
    dispatch(removeItem(cartItems));
    if (userId) {
      if (cartItems.length === 0) {
        dispatch(deleteOrder(id));
      } else {
        dispatch(updateOrder({ id, items: cartItems }));
      }
    }
    window.localStorage.setItem("cart", JSON.stringify(cartItems));
  } else {
    const cartItems = getState().cart.cartItems.slice();
    cartItems.forEach((item) => {
      if (item.name === product.name) {
        item.count--;
      }
    });
    dispatch(_decreaseItem(cartItems));
    const id = getState().orders.order.id;
    if (userId) {
      console.log(cartItems.length);
      if (cartItems.length === 0) {
        dispatch(deleteOrder(id));
      } else {
        dispatch(updateOrder({ id, items: cartItems }));
      }
    }
    window.localStorage.setItem("cart", JSON.stringify(cartItems));
  }
};

export const removeFromCart = (product) => (dispatch, getState) => {
  const cartItems = getState()
    .cart.cartItems.slice()
    .filter((item) => item.name !== product.name);
  dispatch(removeItem(cartItems));
  window.localStorage.setItem("cart", JSON.stringify(cartItems));
};

export const combineCarts = (oldOrder, orderId) => {
  return async (dispatch, getState) => {
    const cartItems = getState().cart.cartItems.slice();
    const combinedCarts = cartItems.concat(oldOrder);
    try {
      if (!cartItems.length) {
        const { data: order } = await axios.delete(`/api/orders/${orderId}`);
        window.localStorage.setItem("cart", JSON.stringify(combinedCarts));
      } else {
        oldOrder.forEach((item) => dispatch(addToCart(item)));
        const { data: order } = await axios.delete(`/api/orders/${orderId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteCart = () => (dispatch, getState) => {
  dispatch(setCart([]));
  const order = getState().orders.order;
  if (order) {
    dispatch(deleteOrder(order.id));
  }
  window.localStorage.setItem("cart", JSON.stringify([]));
};

const initialState = {
  cartItems: JSON.parse(window.localStorage.getItem("cart") || "[]"),
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return { cartItems: action.cart };
    case ADD_TO_CART:
      return { cartItems: action.cart };
    case DECREASE_ITEM:
      return { cartItems: action.cart };
    case REMOVE_FROM_CART:
      return { cartItems: action.cart };
    default:
      return state;
  }
}
