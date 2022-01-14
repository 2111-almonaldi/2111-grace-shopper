import React, { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { authenticate } from "../store";
import { useHistory } from "react-router-dom"
import { gotLogin } from "../store/auth"
import PropTypes from "prop-types"
/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, error} = props;
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

  const history = useHistory()
  // const gotLoginAlert = useSelector((state) => state.auth.loginSuccess)

  const dispatch = useDispatch()
  const routeChange = () => {
    if (dispatch(gotLogin(true))) {
      let path = "/home"
      history.push(path)
    } else {
      let path = '/login';
      history.push(path)
    }
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (evt.target.name === "login") {
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      const successLogin =  dispatch(authenticate(formName, {username, password}));
      if (successLogin) {
        routeChange()
      } else { throw new Error ("Authentication failed")}
    } else {
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      const email = evt.target.email.value;
      const firstName = evt.target.firstName.value;
      const lastName = evt.target.lastName.value;
      const successLogin =  dispatch(authenticate(formName, {username, password, firstName, email}))
        if (successLogin) {
          routeChange()
        } else { throw new Error ("Authentication failed")}
    }
  }


  if (name === "login") {
    return (
      <div>
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <label htmlFor="username">
              <small>Username</small>
            </label>
            <input name="username" type="text" value={username} onChange={(evt) => setUsername(evt.target.value)}/>
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" value={password} onChange={(evt) => setPassword(evt.target.value)}/>
          </div>
          <div>
            <button type="submit">{displayName}</button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </div>
    );
  }
  return (
    <div>
      <form onSubmit={handleSubmit} name={name} >
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" value={email} onChange={(evt) => setEmail(evt.target.value)} />
        </div>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" value={username} onChange={(evt) => setUsername(evt.target.value)}/>
        </div>
        <div>
          <label htmlFor="firstName">
            <small>First Name</small>
          </label>
          <input name="firstName" type="text" value={firstName} onChange={(evt) => setFirstName(evt.target.value)}/>
        </div>
        <div>
          <label htmlFor="lastName">
            <small>Last Name</small>
          </label>
          <input name="lastName" type="text" value={lastName} onChange={(evt) => setLastName(evt.target.value)}/>
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" value={password} onChange={(evt) => setPassword(evt.target.value)}/>
        </div>
        <div>
          <button type="submit">{displayName}</button>
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



// const mapDispatch = (dispatch) => {
//   return {
//     handleSubmit(evt) {
//       evt.preventDefault();
//       if (evt.target.name === "login") {
//         const formName = evt.target.name;
//         const username = evt.target.username.value;
//         const password = evt.target.password.value;
//         const successLogin =  dispatch(authenticate(formName, {username, password}));
//         if (successLogin) {
//           routeChange()
//         } else { throw new Error ("Authentication failed")}
//       } else {
//         const formName = evt.target.name;
//         const username = evt.target.username.value;
//         const password = evt.target.password.value;
//         const email = evt.target.email.value;
//         const firstName = evt.target.firstName.value;
//         const lastName = evt.target.lastName.value;
//         const successLogin =  dispatch(authenticate(formName, {username, password, firstName, email}))
//           if (successLogin) {
//             routeChange()
//           } else { throw new Error ("Authentication failed")}
//       }
//     },
//   };
// };


export const Login = connect(mapLogin)(AuthForm);
export const Signup = connect(mapSignup)(AuthForm);

// prop types
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
