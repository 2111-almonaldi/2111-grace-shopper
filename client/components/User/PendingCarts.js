import React from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import { addToCart, combineCarts } from "../../store/cart";
import { loadPending } from "../../store/order";

export class PendingCarts extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.loadPending();
  }

  render() {
    const cart = this.props.cart || [];
    const orders = this.props.orders.orders || [];
    return (
      <div>
        {orders.length === 0 ? (
          <h3>No Carts</h3>
        ) : (
          <div>
            <h3>Open Carts:</h3>
            <div>
              {orders.map((order, index) => {
                if (order.status === "CREATED") {
                  return (
                    <div className="order" key={index}>
                      <div className="order-info">
                        <p>
                          {" "}
                          {order.items.reduce((a, c) => a + c.count, 0)} items
                          in cart
                        </p>
                        <h5>Cart Preview:</h5>
                        {order.items.map((item, idx) => {
                          if (idx < 3) {
                            return (
                              <div key={idx}>
                                <div>
                                  <ul>{item.name}</ul>
                                </div>
                              </div>
                            );
                          }
                        })}
                        <p> Order created: {order.createdAt}</p>
                        <button
                          onClick={() =>
                            this.props.combineCarts(order.items, order.id)
                          }
                        >
                          Keep Shopping
                        </button>
                      </div>
                    </div>
                  );
                }
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
    orders: state.orders,
    cart: state.cart,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    add: (product) => dispatch(addToCart(product)),
    combineCarts: (orderItems, orderId) =>
      dispatch(combineCarts(orderItems, orderId)),
    loadPending: () => dispatch(loadPending()),
  };
};

export default connect(mapState, mapDispatch)(PendingCarts);
