import React, { Component } from "react";
import { Link } from "react-router-dom";
//import DeleteIcon from "@mui/icons-material/Delete";
//import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

export class Cart extends Component {
  constructor(props) {
    super(props);
  }

  /*const itemsPrice = cart.reduce((a, c) => a + c.price * c.qty, 0);
  const tax = itemsPrice * 0.08;
  const totalPrice = itemsPrice + tax; 
  const onAdd = (product) => {
    const exist = cart.find((item) => item.id === product.id);
    if (exist) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...exist, qty: exist.qty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };
  const onRemove = (product) => {
    const exist = cart.find((item) => item.id === product.id);
    if (exist.qty === 1) {
      setCart(cart.filter((item) => item.id !== product.id));
    } else {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...exist, qty: exist.qty - 1 } : item
        )
      );
    }
  }; */

  render() {
    const { cart } = this.props;
    return (
      <div>
        <h3>Cart Items</h3>
        <div>
          {cart.length === 0 ? (
            <div>
              Cart is Empty—<Link to="/products">Start Browsing!</Link>
            </div>
          ) : (
            <div>{cart.length} items currently in Cart:</div>
          )}
        </div>
      </div>
    );
  }
}

export default Cart;
