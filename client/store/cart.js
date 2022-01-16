import axios from "axios";

const SET_CART = "SET_CART";
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";

export const setCart = (cart) => ({
  type: SET_CART,
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

const initialState = [];

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return action.cart;
    default:
      return state;
  }
}
