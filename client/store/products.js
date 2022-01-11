import axios from 'axios'

//Action Types
const GOT_PRODUCTS = 'GOT_PRODUCTS'

//Action Creators
const gotProducts = (data) => ({
  type: GOT_PRODUCTS,
  data
})

//Thunk Creator
export const loadProducts = () => {
  return async (dispatch) => {
    const { data } = await axios.get('/api/products')
    dispatch(gotProducts(data))
  }
}

//Reducer
const initialState = []

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_PRODUCTS:
      return action.data
    default:
      return state
  }
}