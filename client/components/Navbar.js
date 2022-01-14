import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../store";
//import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";

const Navbar = ({ handleClick }) => {
  // const dispatch = useDispatch()
  // const history = useHistory()
  const isLoggedIn = useSelector((state) => state.auth.loggedIn);
  // const isAdmin = useSelector((state) => state.auth.adminStatus);
  const name = useSelector((state) => state.auth.firstName);

  return (
  <div>
    <h1>MockBuster</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/cart">
            Cart
            {/*<ShoppingCartRoundedIcon />*/}
          </Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/cart">
            Cart
            {/*<ShoppingCartRoundedIcon />*/}
          </Link>
          <Link to="/products">Products</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
  )
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: state.auth.loggedIn
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
