import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { clearCart } from "../store/cart";
import { createOrder, updateOrder } from "../store/order";
import { logoutOrder, clearOrder } from "../store/order";
import "../../public/navbar.css";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = ({ handleClick, isLoggedIn, cart }) => (
  <div className="header">
    {isLoggedIn ? (
      <div className="header headerDiv">
        <Link to="/home">
          <img
            className="header-image"
            src="https://i.pinimg.com/564x/10/f8/bd/10f8bdfb863dee8714e3594e4c79b563.jpg"
            alt=""
          />
        </Link>

        {cart.length === 0 ? (
          <Link to="/cart">
            <ShoppingCartRoundedIcon />
          </Link>
        ) : (
          <Link to="/cart">
            <ShoppingCartRoundedIcon />({cart.reduce((a, c) => a + c.count, 0)})
          </Link>
        )}
        <div className="header-nav dropdown">
          {/* The navbar will show these links after you log in */}
          <MenuIcon />
          <div className="dropdown-content">
            <Link to="/users/:id">
              <span>Account Details</span>
            </Link>
            <br />
            <Link to="/products">
              <span>Products</span>
            </Link>
            <br />
            <a href="#" onClick={handleClick}>
              <span>Logout</span>
            </a>
            <br />
            <Link to="/cart/pendingcarts"> Pending Carts </Link>
          </div>
        </div>
      </div>
    ) : (
      <div className="header headerDiv">
        <Link to="/home">
          <img
            className="header-image"
            src="https://i.pinimg.com/564x/10/f8/bd/10f8bdfb863dee8714e3594e4c79b563.jpg"
            alt=""
          />
        </Link>
        <span>
          {cart.length === 0 ? (
            <Link to="/cart">
              <ShoppingCartRoundedIcon />
            </Link>
          ) : (
            <Link to="/cart">
              <ShoppingCartRoundedIcon />(
              {cart.reduce((a, c) => a + c.count, 0)})
            </Link>
          )}
        </span>
        <div className="header-nav dropdown">
          {/* The navbar will show these links before you log in */}

          <MenuIcon />
          <div className="dropdown-content">
            <span>
              <Link to="/login">Login</Link>
            </span>
            <br />
            <span>
              <Link to="/signup">Sign Up</Link>
            </span>
            <br />
            <span>
              <Link to="/products">Products</Link>
            </span>
            <br />
          </div>
        </div>
      </div>
    )}
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
      dispatch(logoutOrder());
      dispatch(logout());
      //dispatch(clearCart());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
