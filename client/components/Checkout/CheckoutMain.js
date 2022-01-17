import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import Cart from '../Cart';
import '../../../public/checkoutMain.css';
import {
	PaymentElement,
	useStripe,
	useElements,
} from '@stripe/react-stripe-js';

export default function CheckoutMain() {
	const stripe = useStripe();
	const elements = useElements();

	const [succeeded, setSucceeded] = useState(false);
	const [processing, setProcessing] = useState('');
	const [error, setError] = useState(null);
	const [disabled, setDisabled] = useState(true);
	const [clientSecret, setClientSecret] = useState(true);

	// useEffect(() => {
	// 	//generate the stripe secret, which allows us to charge the user
	// 	const getClientSecret = async () => {
	// 		try {
	// 			const response = await axios
	// 		} catch (err) {
	// 			console.log('getClientSecret error', err)
	// 		}
	// 	}
	// }, /*[basket, cart, etc] */)

	const handleChange = (evt) => {
		//listen for changes in the PaymentElement
		//and display any errors as user types their card details
		setDisabled(evt.empty);
		setError(evt.error ? evt.error.message : '');
	};

	const handleSubmit = (evt) => {
		evt.preventDefault();
		setProcessing(true);

		// const payload = await stripe

		// DON'T TOUCH YET:
		// 	// We don't want to let default form submission happen here,
		// 	// which would refresh the page.
		// 	evt.preventDefault();
		// 	if (!stripe || !elements) {
		// 		// Stripe.js has not yet loaded.
		// 		// Make sure to disable form submission until Stripe.js has loaded.
		// 		return;
		// 	}
		// };

		// const result = await stripe.confirmPayment({
		// 	//`Elements` instance that was used to create the Payment Element
		// 	elements,
		// 	confirmParams: {
		// 		return_url: 'https://my-site.com/order/123/complete',
		// 	},
		// });

		// if (result.error) {
		// 	// Show error to your customer (for example, payment details incomplete)
		// 	console.log(result.error.message);
		// } else {
		// 	// Your customer will be redirected to your `return_url`. For some payment
		// 	// methods like iDEAL, your customer will be redirected to an intermediate
		// 	// site first to authorize the payment, then redirected to the `return_url`.
	};

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
						{/*STRIPE!!!*/}

						<form onSubmit={handleSubmit}>
							<PaymentElement onChange={handleChange} />

							<div className="checkout-priceContainer">
								<h4>Order Total:</h4>
								<button disabled={processing || disabled || succeeded}>
									<span>{processing ? <p>Processing...</p> : 'Buy Now'}</span>
								</button>
							</div>
							{/*ERRORS */}
							{error && <div>{error}</div>}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
