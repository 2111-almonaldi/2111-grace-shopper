
import axios from "axios";
import store from "../store";
import { me } from "../store/auth";
import { addCSRFToken } from "../utils/csrf"


const validateFields = (fields) => {
  return fields.every((field) => Object.values(field)[0] !== '');
};

const maintainSession = () => {
  const currentPath = window.location.pathname;
  if (currentPath === '/me') {
  store.dispatch(me())
  }
}

const addCSRFToken = async () => {
  try {
    const { data } = await axios.get("/api/csrf-token")
    return data.csrfToken
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  validateFields,
  maintainSession,
  addCSRFToken
}
