import axios from "axios";

//Action Types
const GOT_PRODUCTS = "GOT_PRODUCTS";
const ADD_PRODUCT = "ADD_PRODUCT";
const UPDATE_PRODUCT = "UPDATE_PRODUCT";
const DELETE_PRODUCT = "DELETE_PRODUCT";

//Action Creators
const gotProducts = (products) => ({
  type: GOT_PRODUCTS,
  products,
});

const addProduct = (product) => ({
  type: ADD_PRODUCT,
  product
});

const deleteProduct = (product) => ({
  type: DELETE_PRODUCT,
  product
});

const changeProduct = (product) => ({
  type: UPDATE_PRODUCT,
  product
});

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

export const updateProduct = (product, history) => {
  return async (dispatch) => {
    const { data: updated } = await axios.put(`/api/products/${product.id}`, product);
    dispatch(changeProduct(updated));
    history.push(`/products/${product.id}`);
  }
  
}

export const removeProduct = (id, history) => {
  return async (dispatch) => {
    const { data: product } = await axios.delete(`/api/products/${id}`);
    dispatch(deleteProduct(product));
    history.push(`/products`);
  }
}

//Reducer
const initialState = [];

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case GOT_PRODUCTS:
      return action.products;
    case UPDATE_PRODUCT:
      return state.map((product) => product.id === action.product.id ? action.product : product);
    case DELETE_PRODUCT:
      return state.filter((product) => product.id !== action.product.id);
    case ADD_PRODUCT:
      return [...state, action.product]
    default:
      return state;
  }
}
