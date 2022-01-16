import axios from "axios"
import store from "../store"
import { setLogin, setAdmin, gotLogin } from "../store/auth"


export const getCookie = async (url, params) => {
  try {
    const token = await addCSRFToken();
    axios.defaults.headers['X-CSRF-Token'] = token;
    const result = await axios.get(url, params)
    store.dispatch(gotLogin({ gotLogin: true}));
    return result
  } catch (err) {
    console.log(err)
  }
}

export const postCookie = async (url, params) => {
  try {
    const token = await addCSRFToken();
    axios.defaults.headers['X-CSRF-Token'] = token;
    const result = await axios.post(url, params);
    store.dispatch(gotLogin({ gotLogin: true}))
    // store.dispatch(setAdmin(status))
    return result;
  } catch (err) {
    console.log(err);
  }
}

export const patchCookie = async (url, params) => {
  try {
    const token = await addCSRFToken();
    axios.defaults.headers['X-CSRFToken'] = token
    const result = await axios.patch(url, params)
    store.dispatch(gotLogin({ gotLogin: true}))
    return result
  } catch (err) {
    console.log(err)
  }
}
