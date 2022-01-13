import axios from "axios";

//Action Types
const GOT_PRODUCTS = "GOT_PRODUCTS";

//Action Creators
const gotProducts = (products) => ({
  type: GOT_PRODUCTS,
  products,
});

//Thunk Creator
export const loadProducts = () => {
  return async (dispatch) => {
    try{
      const { data } = await axios.get("/api/products");
      dispatch(gotProducts(data));
    } catch(err){
      console.error(err)
    }
  };
};

//Reducer
const initialState = [];

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case GOT_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}
