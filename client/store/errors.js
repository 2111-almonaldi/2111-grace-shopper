
/**
 * STATE
 */
export const GET_ERRORS = "GET_ERRORS"
export const RESET_ERRORS = "RESET_ERRORS"


/**
 * ACTION CREATORS
 */

export const getErrors = (errors) => { return {type: GET_ERRORS, errors}}
export const resetErrors = () => { return {type: RESET_ERRORS}}

/**
 * THUNK CREATORS
 */

const initialState = {
}

export default function (state = initialState, action) {
  switch (action.type) {
  case GET_ERRORS:
    return action.errors
  case RESET_ERRORS:
    return {}
  default:
    return state
  }
}
