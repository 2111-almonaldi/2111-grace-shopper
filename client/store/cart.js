import axios from "axios";

const SET_CART = "SET_CART";
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";

export const setCart = (cart) => ({
  type: SET_CART,
  cart,
});

export const addItem = (cart) => ({
  type: ADD_TO_CART,
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

export const addToCart = (product) => (dispatch, getState) => {
  const cartItems = getState().cart.cartItems.slice();
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
  window.localStorage.setItem("cart", JSON.stringify(cartItems));
};

export const removeFromCart = (product) => (dispatch, getState) => {
  const cartItems = getState()
    .cart.cartItems.slice()
    .filter((item) => item.name !== product.name);
  dispatch(removeItem(cartItems));
  window.localStorage.setItem("cart", JSON.stringify(cartItems));
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
    case REMOVE_FROM_CART:
      return { cartItems: action.cart };
    default:
      return state;
  }
}
