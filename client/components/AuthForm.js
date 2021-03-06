import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  if (displayName === "Login") {
    return (
      <div className="form-container">
        <form className="main-form" onSubmit={handleSubmit} name={name}>
          <div>
            <label className="form-label" htmlFor="username">
              <small>Username</small>
            </label>
            <input className="form-input" name="username" type="text" />
          </div>
          <div>
            <label className="form-label" htmlFor="password">
              <small>Password</small>
            </label>
            <input className="form-input" name="password" type="password" />
          </div>
          <div>
            <button className="form-button" type="submit">{displayName}</button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </div>
    );
  }
  return (
    <div className="form-container">
      <form className="main-form" onSubmit={handleSubmit} name={name}>
        <div>
          <label className="form-label" htmlFor="email">
            <small>Email</small>
          </label>
          <input className="form-input" name="email" type="text" />
        </div>
        <div>
          <label className="form-label" htmlFor="username">
            <small>Username</small>
          </label>
          <input className="form-input" name="username" type="text" />
        </div>
        <div>
          <label className="form-label" htmlFor="firstName">
            <small>First Name</small>
          </label>
          <input className="form-input" name="firstName" type="text" />
        </div>
        <div>
          <label className="form-label" htmlFor="lastName">
            <small>Last Name</small>
          </label>
          <input className="form-input" name="lastName" type="text" />
        </div>
        <div>
          <label className="form-label" htmlFor="password">
            <small>Password</small>
          </label>
          <input className="form-input" name="password" type="password" />
        </div>
        <div>
          <button className="form-button" type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      if (evt.target.name === "login") {
        const formName = evt.target.name;
        const username = evt.target.username.value;
        const password = evt.target.password.value;
        dispatch(authenticate(formName, username, password));
      } else {
        const formName = evt.target.name;
        const username = evt.target.username.value;
        const password = evt.target.password.value;
        const email = evt.target.email.value;
        const firstName = evt.target.firstName.value;
        const lastName = evt.target.lastName.value;
        dispatch(
          authenticate(formName, username, password, email, firstName, lastName)
        );
      }
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
