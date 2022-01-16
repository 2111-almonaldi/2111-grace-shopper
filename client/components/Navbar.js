import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { clearCart } from "../store/cart";
//import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";

const Navbar = ({ handleClick, isLoggedIn, cart }) => (
  <div>
    <h1>MockBuster</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/products">Products</Link>
          {cart.length === 0 ? (
            <Link to="/cart">Cart{/*<ShoppingCartRoundedIcon />*/}</Link>
          ) : (
            <Link to="/cart">
              Cart ({cart.reduce((a, c) => a + c.count, 0)})
              {/*<ShoppingCartRoundedIcon />*/}
            </Link>
          )}
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/products">Products</Link>
          {cart.length === 0 ? (
            <Link to="/cart">Cart{/*<ShoppingCartRoundedIcon />*/}</Link>
          ) : (
            <Link to="/cart">
              Cart ({cart.reduce((a, c) => a + c.count, 0)})
              {/*<ShoppingCartRoundedIcon />*/}
            </Link>
          )}
        </div>
      )}
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    cart: state.cart.cartItems,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
      dispatch(clearCart());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
