import React from "react";
import { connect } from "react-redux";

export default function Cart(props) {
  const { cartItems, onAdd, onRemove } = props;
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const tax = itemsPrice * 0.08;
  const totalPrice = itemsPrice + tax;
  return (
    <div>
      <h3>Cart Items</h3>
      <div>{cartItems.length === 0 && <div>Cart is Empty</div>}</div>
      {cartItems.map((item) => {
        return (
          <div key={item.id}>
            <img src={item.image}></img>
            <div>{item.name}</div>
            <div>
              <button onClick={() => onAdd(item)}>+</button>
              <button onClick={() => onRemove(item)}>-</button>
            </div>
            <div>
              {item.qty} x {item.price.toFixed(2)}
            </div>
          </div>
        );
      })}
      {cartItems.length !== 0 && (
        <>
          <hr></hr>
          <div className="row">
            <div>Subtotal</div>
            <div>{itemsPrice.toFixed(2)}</div>
          </div>
          <div className="row">
            <div>Tax</div>
            <div>{tax.toFixed(2)}</div>
          </div>
          <div className="row">
            <div>Total</div>
            <div>{totalPrice.toFixed(2)}</div>
          </div>
          <hr />
          <div className="row">
            <button onClick={() => alert("Implement Checkout!")}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
