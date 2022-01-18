import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
	addToCart,
	removeFromCart,
	decreaseItem,
	clearCart,
} from '../store/cart';
import '../../public/cart.css';
import '../../public/subtotal.css';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
//import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

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
				<h3>Cart Details</h3>
				<div>
					{cart.length === 0 ? (
						<div className="cart-container">
							Cart is Empty<Link to="/products">Start Browsing!</Link>
						</div>
					) : (
						<div className="cart">
							<div className="cart-container">
								{cart.map((item, idx) => (
									<div key={idx}>
										<img className="cart-itemImage" src={item.imageUrl}></img>
										<strong className="cart-itemName">{item.name}</strong>
										<div>
											<IndeterminateCheckBoxIcon
												className="cart-itemQty"
												onClick={() => this.props.remove(item)}
											/>
											{item.count}
											<AddBoxIcon
												className="cart-itemQty"
												onClick={() => this.props.add(item)}
											/>
										</div>
										<div className="cart-itemPrice">${item.price}</div>

										<DeleteIcon
											className="cart-itemDelete"
											onClick={() => this.props.removeFromCart(item)}
										/>
									</div>
								))}
							</div>
							<div>
								{cart.length !== 0 && (
									<div>
										<hr />
										<div className="subtotal">
											<div className="subtotal-container">
												<strong>Subtotal:</strong> ${itemsPrice.toFixed(2)}
											</div>
											<div>
												{cart.reduce((a, c) => a + c.count, 0)} items in Cart:
											</div>
											<div>
												<strong>Tax:</strong> ${tax.toFixed(2)}
											</div>
											<hr />
											<div>
												<strong>Order Total:</strong> ${totalPrice.toFixed(2)}
											</div>
											<button className="subtotal-button">
												<Link to={`/checkout`}>Proceed to Checkout</Link>
											</button>
										</div>
									</div>
								)}
								<button
									className="subtotal-button"
									onClick={() => this.props.clearCart()}
								>
									Clear Cart
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		);
	}
}

const mapState = (state) => {
	const stateCart = state.cart.cartItems.length
		? state.cart.cartItems
		: state.auth.orders
		? state.auth.orders[0].items
		: state.cart.cartItems;
	return {
		cart: stateCart,
	};
};

const mapDispatch = (dispatch) => {
	return {
		removeFromCart: (product) => dispatch(removeFromCart(product)),
		add: (product) => dispatch(addToCart(product)),
		remove: (product) => dispatch(decreaseItem(product)),
		clearCart: () => dispatch(clearCart([])),
	};
};

export default connect(mapState, mapDispatch)(Cart);
