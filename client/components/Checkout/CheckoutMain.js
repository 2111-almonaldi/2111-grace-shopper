import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import UserCheckout from './UserCheckout';
import GuestCheckout from './GuestCheckout';
import CardForm from './CardForm';
import '../../../public/checkoutMain.css';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const CheckoutMain = ({ isLoggedIn, cart }) => {
	const itemsPrice = cart.reduce((a, c) => a + c.price * c.count, 0);
	const tax = itemsPrice * 0.08;
	const totalPrice = itemsPrice + tax;

	return (
		<div className="checkout">
			<div className="checkout-container">
				<h1>Checkout</h1>
				<Link to="/cart">
					<KeyboardBackspaceIcon fontSize="small" />
					<span className="checkout-return">Return to Cart</span>
				</Link>

				{/*checkout section - delivery address */}
				<div className="checkout-section">
					<div className="checkout-header">
						<h4>Delivery Address</h4>
					</div>
					<div className="checkout-address">
						<GuestCheckout />
					</div>
				</div>

				{/*checkout section - review items */}
				<div className="checkout-section">
					<div className="checkout-header">
						<h4>Review Items</h4>
						<div className="checkout-items">
							{cart.map((item, idx) => (
								<div key={idx}>
									<img className="cart-itemImage" src={item.imageUrl}></img>
									<div className="cart-itemName">{item.name}</div>
									<div>{item.count}</div>
									<div className="cart-itemPrice">${item.price}</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/*checkout section - payment */}
				<div className="checkout-section">
					<div className="checkout-header">
						<h4>Payment Method</h4>
					</div>
				</div>
				<div>
					{cart.length !== 0 && (
						<div className="checkout-subtotal">
							<div>
								<strong>Subtotal:</strong> ${itemsPrice.toFixed(2)}
								<div>{cart.reduce((a, c) => a + c.count, 0)} items</div>
								<div>
									<strong>Tax:</strong> ${tax.toFixed(2)}
								</div>
								<div>
									<strong>Order Total:</strong> ${totalPrice.toFixed(2)}
								</div>
							</div>
						</div>
					)}
				</div>
				<CardForm />
			</div>
		</div>
	);
};

const mapState = (state) => ({
	isLoggedIn: !!state.auth.id,
	cart: state.cart.cartItems,
});

export default connect(mapState)(CheckoutMain);
