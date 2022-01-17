import React from 'react';
// import Cart from '../Cart';
import PaymentForm from './PaymentForm';
import '../../../public/checkoutMain.css';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(
	'pk_test_51KIhdSBUe6p65tjNXtHN5NUIQVk30J1x34GqAuvZZZc4QYJ7m2FHOiEjIbfyIkNGXAT2Km74UYnJ5BYJfZ442nIQ00QqawjRra'
);

export default function CheckoutMain() {
	return (
		<div className="checkout">
			<div className="checkout-container">
				<h1>Checkout</h1>

				{/*checkout section - delivery address */}
				<div className="checkout-section">
					<div className="checkout-header">
						<h4>Delivery Address</h4>
					</div>
					<div className="checkout-address">
						<p>Tiffany McNerlin</p>
						<p>806 Burgandy Ct</p>
						<p>Jacksonville, AR</p>
						<p>72076</p>
					</div>
				</div>

				{/*checkout section - review items */}
				<div className="checkout-section">
					<div className="checkout-header">
						<h4>Review Items</h4>
						<div className="checkout-items">
							<p>ITEM</p>
							<p>ITEM</p>
							<p>ITEM</p>
						</div>
					</div>
				</div>

				{/*checkout section - payment */}
				<div className="checkout-section">
					<div className="checkout-header">
						<h4>Payment Method</h4>
					</div>
					<div className="checkout-details">
						<Elements stripe={stripePromise}>
							<PaymentForm />
						</Elements>
					</div>
				</div>
			</div>
		</div>
	);
}
