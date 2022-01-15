import axios from "axios";

//Action Types
const GOT_PRODUCTS = "GOT_PRODUCTS";
const ADD_PRODUCT = "ADD_PRODUCT";

//Action Creators
const gotProducts = (products) => ({
  type: GOT_PRODUCTS,
  products,
});
const addProduct = (product) => ({
  type: ADD_PRODUCT,
  product
})

//Thunk Creator
export const loadProducts = () => {
  return async (dispatch) => {
    try{
      const { data } = await axios.get(`/api/products`);
      dispatch(gotProducts(data));
    } catch(err){
      console.error(err)
    }
  };
};

export const addNewProduct = (data, history) => {
  return async (dispatch) => {
    const { data: created } = await axios.post(`/api/products`, data);
    dispatch(addProduct(created));
    history.push(`/products`);
  }
}

//Reducer
const initialState = [];

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case GOT_PRODUCTS:
      return action.products;
    case ADD_PRODUCT:
      return [...state, action.product]
    default:
      return state;
  }
}
