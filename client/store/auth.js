import axios from "axios"
import history from "../history"
import { database } from "faker";
// const cookieParser = require("cookie-parser");
// const { cookieSecret, jwtSecret } = require('../config')
// add cart and local cart (user vs guest) thunks/action creators
// initCart()

/**
 * STATE
 */

export const LOGGED_IN = true;
export const NOT_LOGGED_IN = false;


const TOKEN = "token";

/**
 * ACTION TYPES
 */
const SET_AUTH = "SET_AUTH"
const SET_LOGIN = "SET_LOGIN"
const SET_LOGOUT = "SET_LOGOUT"
const SET_INFO = "SET_INFO"
const UPDATE_INFO = "UPDATE_INFO"
const CHANGE_PASSWORD = "CHANGE_PASSWORD"
const GOT_LOGIN = "GOT_LOGIN"
const SET_ADMIN = "SET_ADMIN"

/**
 * ACTION CREATORS
 */
const setAuth = auth => ({ type: SET_AUTH, auth })
const setLogin = (firstName, lastName, username, email) => ({  type: SET_LOGIN, firstName, lastName, username, email })
const setLogOut = () => ({  type: SET_LOGOUT, firstName: "Guest"})
const setInfo = ({ firstName, lastName, username, email}) => ({  type: SET_INFO, payload: { firstName, lastName, username, email}} )
const updateInfo = ({ firstName, lastName, username, email} ) => ({  type: UPDATE_INFO, payload: { firstName, lastName, username, email }})
const changePassword = () => ({ type: CHANGE_PASSWORD })
export const gotLogin = (bool) => ({ type: GOT_LOGIN, bool })
const setAdmin = (status) => ({ type: SET_ADMIN, status })
/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  return async(dispatch) => {
    try {
      const res = await axios.get("/auth/me")
      console.log(`res: ${res}`)
      if (res.data.loggedIn) {
        const { firstName, lastName, username, email, isAdmin} = res.data
        dispatch(setLogin(firstName, lastName, username, email))
        dispatch(setAdmin(isAdmin))

      }
      else {
        console.log("Authentication failed")
      }
    } catch (err) {
      console.log(err)
    }
  }
}


/**
 * THUNK CREATORS
 */
// export const me = () => async (dispatch) => {
//   const token = window.localStorage.getItem(TOKEN);
//   if (token) {
//     const res = await axios.get("/auth/me", {
//       headers: {
//         authorization: token,
//       },
//     });
//     return dispatch(setAuth(res.data));
//   }
// };


export const authenticate = (method, credentials) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`/auth/${method}`, credentials)
      console.log(res.data)
      if (res.data.loggedIn) {
        const {firstName, lastName, username, email, isAdmin} = res.data
        dispatch(gotLogin(true))
        dispatch(setLogin(firstName, lastName, username, email))
        dispatch(setAdmin(isAdmin))
        return true;
      } else {
        // dispatch(me())
        console.log("Authentication failed")
        dispatch(gotLogin(false))
        // dispatch(setLogin(firstName, lastName, username, email))
        // dispatch(setAdmin(isAdmin))
      }
    } catch (err) {
      // return dipatch(setAuth({error: authError}))
      dispatch(gotLogin(false))
      console.log(err)
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/auth/logout")
      if (!res.data.loggedIn) {
        dispatch(setLogout())
        dispatch(gotLogin(false))
      } else {
        console.log("Failed to log out user")
      }
    } catch (err) {
      console.log(err)
    }
  }
}
//   window.localStorage.removeItem(TOKEN)
//   history.push("/login")
//   return {
//     type: SET_AUTH,
//     auth: {}
//   }
// }

export const getInfo = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/auth/info")
      dispatch(setInfo(data.user))
    } catch (err) {
      console.log(err)
    }
  }
}
// export const authenticate =
//   (username, password, method, email, firstName, lastName) =>
//   async (dispatch) => {
//     try {
//       const res = await axios.post(`/auth/${method}`, {
//         username,
//         password,
//         email,
//         firstName,
//         lastName,
//       });
//       window.localStorage.setItem(TOKEN, res.data.token);
//       dispatch(me());
//     } catch (authError) {
//       return dispatch(setAuth({ error: authError }));
//     }
//   };

// export const logout = () => {
//   window.localStorage.removeItem(TOKEN);
//   history.push("/login");
//   return {
//     type: SET_AUTH,
//     auth: {},
//   };
// };

export const updateInfoThunk = (updateInfo) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/auth/update", updateInfo)
      if (data) {
      console.log(`updated info: ${data.user}`)
      dispatch(updateInfo(data.user))
    }
    } catch (err) {
      console.log(err)
    }
  }
}

export const changePassWordThunk = (password) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/auth/change", password)
      if (res.status === 204) alert("password is incorrect")
      else {
        alert("Password changed successfully")
        dispatch(changePassword())
      }
    } catch (err) {
      console.log(err)
    }
  }
}
/**
 * REDUCER
 */
const initialState = {
  firstName: "Guest",
  lastName: "",
  username: "",
  email: "",
  loggedIn: NOT_LOGGED_IN,
  gotLogin: true,
  error: false,
  isAdmin: false // **
}
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_LOGIN:
      return {
        ...state,
        loggedIn: LOGGED_IN,
        firstName: action.firstName,
        lastName: action.lastName,
        username: action.username,
        email: action.email
      };
    case SET_LOGOUT:
      return {
        ...state,
        loggedIn: NOT_LOGGED_IN,
        firstName: "Guest",
        lastName: "",
        username: "",
        email: "",
      }
    case SET_INFO:
      return {
        ...state,
        ...action.payload
      }
    case UPDATE_INFO:
      return {
        ...state,
        ...action.payload
      }
    case CHANGE_PASSWORD:
      return {
        ...state
      }
    case GOT_LOGIN:
      return {
        ...state,
        gotLogin: action.bool
      }
    case SET_ADMIN:
      return {
        ...state,
        isAdmin: action.status
    }
    default:
      return state;
  }
}
// export default function (state = {}, action) {
//   switch (action.type) {
//     case SET_AUTH:
//       return action.auth;
//     default:
//       return state;
//   }
// }
