import React from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import { addToCart } from "../../store/cart";

export class PendingCarts extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { cart, orders } = this.props;
    return (
      <div>
        {orders.length === 0 ? (
          <h3>No Carts</h3>
        ) : (
          <div>
            <h3>Open Carts:</h3>
            <div>
              {orders.map((order, index) => {
                return (
                  <div className="order" key={index}>
                    <div className="order-info">
                      <h5>Order Number: {order.id}</h5>
                      <p>
                        {" "}
                        {order.items.reduce((a, c) => a + c.count, 0)} items in
                        cart
                      </p>
                      <p> Order created: {order.createdAt}</p>
                      <button
                        onClick={
                          () => console.log(cart.cartItems, order.items)

                          //order.items.forEach((item) => this.props.add(item))
                        }
                      >
                        Keep Shopping
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    orders: state.auth.orders,
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    add: (product) => dispatch(addToCart(product)),
  };
};

export default connect(mapState, mapDispatch)(PendingCarts);
