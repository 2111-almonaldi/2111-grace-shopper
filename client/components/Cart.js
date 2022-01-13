import React from "react";
import { useState, useEffect } from "react";
//import DeleteIcon from "@mui/icons-material/Delete";
//import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

const cartFromLocalStorage = JSON.parse(
  window.localStorage.getItem("cart") || "[]"
);

export default function Cart(props) {
  const [cart, setCart] = useState(cartFromLocalStorage);

  useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const itemsPrice = cart.reduce((a, c) => a + c.price * c.qty, 0);
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
  };

  return (
    <div>
      <h3>Cart Items</h3>
      <div>{cart.length === 0 && <div>Cart is Empty</div>}</div>
      {cart.map((item) => {
        return (
          <div key={item.id}>
            <img src={item.imageURL}></img>
            <div>{item.name}</div>
            <div>
              <button onClick={() => onAdd(item)}>
                {/*<AddCircleRoundedIcon />*/} Add Item
              </button>
              <button onClick={() => onRemove(item)}>
                {/*<DeleteIcon />*/} Delete Item
              </button>
            </div>
            <div>
              {item.qty} x {item.price.toFixed(2)}
            </div>
          </div>
        );
      })}
      {cart.length !== 0 && (
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

/* make cart persist :
this should be on the main page, the first page that our app will load on:

const cartFromLocalStorage = JSON.parse(LocalStorage.getItem("cart") || "[]")

function App(){
    const [cart, setCart] = useState(cartfromLocalStorage);
    
useEffect(()=>{
    localStorage.setItem("cart", JSON.stringify(cart));
},[cart]);
    
}


*/
