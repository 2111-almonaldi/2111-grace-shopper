import axios from "axios";
import history from "../history";
import { database } from "faker";

const TOKEN = "token";

/**
 * ACTION TYPES
 */
const SET_AUTH = "SET_AUTH";
const SET_ADMIN_STATUS = "SET_ADMIN_STATUS";

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });
export const setAdminStatus = (status) => ({ type: SET_ADMIN_STATUS, status });
/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
  }
};

export const authenticate =
  (method, username, password, email, firstName, lastName) =>
  async (dispatch) => {
    try {
      const res = await axios.post(`/auth/${method}`, {
        username,
        password,
        email,
        firstName,
        lastName,
      });
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me());
      dispatch(setAdminStatus(res.data.isAdmin))
      history.push("/home");
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push("/login");
  return {
    type: SET_AUTH,
    auth: {},
  };
};


/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    case SET_ADMIN_STATUS:
      return action.auth
    default:
    return state;
  }
}
