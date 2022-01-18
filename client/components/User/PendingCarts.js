import React from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

export class PendingCarts extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { orders } = this.props;
    return (
      <div>
        Open Carts:
        {orders.map((order, index) => {
          return (
            <div className="order" key={index}>
              <div className="order-info">
                <h5>Order Number: {order.id}</h5>
                <p>
                  {" "}
                  {order.items.reduce((a, c) => a + c.count, 0)} items in cart
                </p>
                <p> Order created: {order.createdAt}</p>
                <button>Keep Shopping</button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    orders: state.auth.orders,
  };
};

export default connect(mapState)(PendingCarts);
