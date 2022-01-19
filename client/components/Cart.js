import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  addToCart,
  removeFromCart,
  decreaseItem,
  deleteCart,
} from "../store/cart";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import formatPrice from "../formatPrice";

export class Cart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { cart } = this.props;
    const itemsPrice = cart.reduce((a, c) => a + c.price * c.count, 0);
    const tax = itemsPrice * 0.08;
    const totalPrice = itemsPrice + tax;
    return (
      <div>
        <div className="cart-header">Cart Details</div>
        <div>
          {cart.length === 0 ? (
            <h3>
              Cart is Empty—<Link to="/products">Start Browsing!</Link>
            </h3>
          ) : (
            <div className="cart">
              <h3>{cart.reduce((a, c) => a + c.count, 0)} items in Cart:</h3>
              <div className="cart-items">
                {cart.map((item, idx) => (
                  <div key={idx}>
                    <div>
                      <img src={item.imageUrl}></img>
                    </div>
                    <div>
                      <h4>{item.name}</h4>
                      <div>
                        <button onClick={() => this.props.remove(item)}>
                          <RemoveIcon />
                        </button>{" "}
                        {item.count}{" "}
                        <button onClick={() => this.props.add(item)}>
                          <AddIcon />
                        </button>{" "}
                        <strong>
                          <strong>Price:</strong> {formatPrice(item.price)}
                        </strong>
                        <button onClick={() => this.props.removeFromCart(item)}>
                          <DeleteIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => this.props.deleteCart()}>
                Clear Cart
              </button>
              {cart.length !== 0 && (
                <div className="total">
                  <div>
                    <div>
                      <strong>Subtotal:</strong> ${itemsPrice.toFixed(2)}
                    </div>
                    <div>
                      <strong>Tax:</strong> ${tax.toFixed(2)}
                    </div>
                    <hr />
                    <div>
                      <strong>Order Total:</strong> ${totalPrice.toFixed(2)}
                    </div>
                    <button>
                      <Link to={`/checkout`}>Proceed to Checkout</Link>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    cart: state.cart.cartItems,
  };
};

const mapDispatch = (dispatch) => {
  return {
    removeFromCart: (product) => dispatch(removeFromCart(product)),
    add: (product) => dispatch(addToCart(product)),
    remove: (product) => dispatch(decreaseItem(product)),
    deleteCart: () => dispatch(deleteCart()),
  };
};

export default connect(mapState, mapDispatch)(Cart);
