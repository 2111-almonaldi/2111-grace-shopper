import axios from "axios";
import history from "../history";
import { getErrors, resetErrors } from "./errors"
import { FETCH_PENDING, FETCH_ERROR, FETCH_COMPLETE } from "../../constants";

/**
 * ACTION TYPES
 */

export const SET_ADMIN_USERS_FETCH_STATUS = "SET_ADMIN_USERS_FETCH_STATUS";
export const SET_ADMIN_PRODUCTS_FETCH_STATUS = "SET_ADMIN_PRODUCTS_FETCH_STATUS"
export const SET_ADMIN_ORDERS_FETCH_STATUS = "SET_ADMIN_ORDERS_FETCH_STATUS";
const ADMIN_GET_USERS = "ADMIN_GET_USERS";
const ADMIN_DEL_USERS = "ADMIN_DEL_USERS";
const ADMIN_UPDATE_USER = "ADMIN_UPDATE_USER";
const ADMIN_PROMOTE_USER = "ADMIN_PROMOTE_USER"; // @@
const ADMIN_GET_ORDERS = "ADMIN_GET_ORDERS";
const ADMIN_UPDATE_ORDER = "ADMIN_UPDATE_ORDER";
const ADMIN_GET_PRODUCTS = "ADMIN_GET_PRODUCTS";
const ADMIN_ADD_PRODUCT = "ADMIN_ADD_PRODUCT";
const ADMIN_UPDATE_PRODUCT = "ADMIN_EDIT_PRODUCT";
const ADMIN_DEL_PRODUCT = "ADMIN_DEL_PRODUCT";

/**
 * ACTION CREATORS
 */
export const fetchAdminUserStatus = status => ({ type: SET_ADMIN_USERS_FETCH_STATUS, status: status });
export const fetchAdminProductsStatus = status => ({ type: SET_ADMIN_PRODUCTS_FETCH_STATUS, status: status });
export const fetchAdminOrdersStatus = status => ({ type: SET_ADMIN_ORDERS_FETCH_STATUS, status})
export const adminGetUsers = payload => ({ type: ADMIN_GET_USERS, payload}); // users
export const adminDelUser = user => ({ type: ADMIN_DEL_USERS, user }); //
export const adminUpdateUser = user => ({ type: ADMIN_UPDATE_USER, user });
export const adminPromoteUser = user => ({ type: ADMIN_PROMOTE_USER, user });
export const adminGetOrders = payload => ({ type: ADMIN_GET_ORDERS, payload }); // orders
export const adminUpdateOrder = order => ({ type: ADMIN_UPDATE_ORDER, order });
export const adminGetProducts = payload => ({ type: ADMIN_GET_PRODUCTS, payload }); // products
export const adminAddProduct = product => ({ type: ADMIN_ADD_PRODUCT, product });
export const adminUpdateProduct = product => ({ type: ADMIN_UPDATE_PRODUCT, product });
export const adminDelProduct = product => ({ type: ADMIN_DEL_PRODUCT, product });


/**
 * THUNK CREATORS
 */
export const fetchAdminUsers = () => {
  return async dispatch => {
    try {
      dispatch(fetchAdminUserStatus(FETCH_PENDING));
      const { data } = await axios.get(`/api/admin/users`);
      dispatch(fetchAdminUsers(data))
      dispatch(fetchAdminUserStatus(FETCH_COMPLETE));
    } catch (err) {
      dispatch(fetchAdminUserStatus(FETCH_ERROR));
      dispatch(getErrors(err))
    }
  }
};


export const fetchAdminProducts = (location) => {
  return async dispatch => {
    try {
      dispatch(fetchAdminProductsStatus(FETCH_PENDING))
      const { data } = await axios.get(`/api/products${location ? location.search : ""}`)
      dispatch(adminGetProducts(data))
      dispatch(fetchAdminProductsStatus(FETCH_COMPLETE))
    } catch (err) {
      dispatch(fetchAdminProductsStatus(FETCH_ERROR))
      dispatch(getErrors(err));
    }
  }
}

export const fetchAdminOrders = (location) => {
  return async dispatch => {
    try {
      dispatch(fetchAdminOrdersStatus(FETCH_PENDING))
      const { data } = await axios.get(`/api/orders/${location ? location.search : ""}`)
      dispatch(adminGetOrders(data));
      dispatch(fetchAdminOrdersStatus(FETCH_COMPLETE))
    } catch (err) {
      dispatch(fetchAdminOrdersStatus(FETCH_ERROR))
      dispatch(getErrors(err))
    }
  }
}


// export const adminGetInfo = () => dispatch =>
//   Promise.all([
//     axios.get("api/users"),
//     axios.get("api/products"),
//     axios.get("api/orders")
//   ])
//   .then(([res1, res2, res3]) => {
//     dispatch(adminGetUsers(res1.data || []))
//     dispatch(adminGetProducts(res2.data || []))
//     dispatch(adminGetOrders(res3.data || []))
//   })
//   .catch(err => {
//     getErrors(err)
//     console.log(err)
//   })





export const adminUpdateUserThunk = (userId, data) => {
  return async dispatch => {
    try {
      const res = await axios.put(`api/admin/users/${userId}`, data)
      dispatch(adminUpdateUser(res.data));
      return true;
    } catch (err) {
      dispatch(getErrors(err))
      return false;
    }
  }
}

export const adminDelUserThunk = (userId) => {
  return async dispatch => {
    try {
      const { data } = await axios.delete(`/api/users/${userId}`);
      dispatch(adminDelUser(data));
    } catch (err) {
      dispatch(getErrors(err));
      console.error(err);
    }
  }
}

export const adminPromoteUserThunk = (userId) => {
  return async dispatch => {
    try {
      const { data } = await axios.put(`/api/users/${userId}`, {isAdmin: true})
      dispatch(adminPromoteUser(data));
    } catch (err) {
      dispatch(getErrors(err));
      console.error(err);
    }
  }
}

export const adminOrderStatusThunk = (orderId, data) => {
  return async dispatch => {
    try {
      const res = await axios.put(`/api/admin/orders/${orderId}`, data);
      dispatch(adminUpdateOrder(res.data));
    } catch (err) {
      getErrors(err);
      console.error(err);
    }
  }
}

export const adminAddProductThunk = (data) => {
  return async dispatch => {
    try {
      const res = await axios.post(`api/admin/products`, data)
      dispatch(adminAddProduct(res.data));
      return true;
    } catch (err) {
      dispatch(getErrors(err));
      return false;
    }
  }
}

export const adminDelProductThunk = (data) => {
  return async dispatch => {
    try {
      const res = await axios.delete(`/api/admin/products/${productId}`);
      if (res.statusCode === 200) {
        dispatch(adminDelProduct(res.data));
        return true;
      }
      return true;
    } catch (err) {
      dispatch(getErrors(err));
      return false
    }
  }
}

export const adminUpdateProductThunk = (productId, data) => {
  return async dispatch => {
    try {
      const res = await axios.put(`/api/products/${productId}`, data);
      dispatch(adminUpdateProduct(res.data));
      return true;
    } catch (err) {
      dispatch(getErrors(err));
      return false;
    }
  }
}


/**
 * INITIAL STATE
 */
const initialState = {
  users: [],
  orders: [],
  products: [],
  GetUsersStatus: FETCH_PENDING,
  GetOrdersStatus: FETCH_PENDING,
  GetProductsStatus: FETCH_PENDING,
  totalUsers: 0,
  totalOrders: 0,
  totalProducts: 0
}

/**
 * REDUCER
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ADMIN_USERS_FETCH_STATUS:
      return { ...state, GetUsersStatus: action.status }
    case ADMIN_GET_USERS:
      return { ...state, ...action.payload };
    case ADMIN_UPDATE_USER:
      return {
        ...state,
        users: [...state.users.filter(user => user.id !== action.user.id), action.user]
      }
    case ADMIN_PROMOTE_USER:
      return {
        ...state,
        users: [...state.users.map(user => {
          if (user.id === action.user.id) user.isAdmin = true
          return user
        })]
      }
    case SET_ADMIN_ORDERS_FETCH_STATUS:
      return { ...state, GetOrdersStatus: action.status }
    case ADMIN_GET_ORDERS:
      return { ...state, ...action.payload };
    case ADMIN_UPDATE_ORDER:
      return {
        ...state,
        orders: [...state.orders.filter(order => order.id !== action.order.id), action.order]
      }
    case SET_ADMIN_PRODUCTS_FETCH_STATUS:
      return { ...state, GetProductsStatus: action.status }
    case ADMIN_GET_PRODUCTS:
      return { ...state, ...action.payload }
    case ADMIN_ADD_PRODUCT:
      return { ...state, products: state.products.concat(action.product)}
    case ADMIN_UPDATE_PRODUCT:
      return {
        ...state,
        products: [...state.products.filter(product => product.id !== action.product.id), action.product]
      }
    case ADMIN_DEL_PRODUCT:
      return {
        ...state,
        products: [...state.products.filter(product => product.id !== action.product.id), action.product]
      }
    default:
      return state
  }
}
