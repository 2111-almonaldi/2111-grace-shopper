import axios from "axios";

const SET_CART = "SET_CART";
const UPDATE_CART = "UPDATE_CART";

export const setCart = (cart) => ({
  type: SET_CART,
  cart,
});

export const _updateCart = (cart) => ({
  type: UPDATE_CART,
  cart,
});

export const fetchCart = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/cart");
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
