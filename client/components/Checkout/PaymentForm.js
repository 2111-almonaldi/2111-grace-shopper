import React, { useState } from 'react';
import axios from 'axios';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

export default function PaymentForm() {
	const [success, setSuccess] = useState(false);
	const stripe = useStripe();
	const elements = useElements();

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card: elements.getElement(CardElement),
		});

		//REMEMBER TO CHANGE RESPONSE DATA BELOW
		if (!error) {
			try {
				const { id } = paymentMethod;
				const response = await axios.post('http://localhost:8080/checkout', {
					amount: totalPrice.toFixed(2),
					id,
				});

				if (response.data.success) {
					console.log('Successful Payment!');
					setSuccess(true);
				}
			} catch (error) {
				console.log('Payment Error!', error);
			}
		} else {
			console.log(error.message);
		}
	};

	return (
		<>
			{!success ? (
				<form onSubmit={handleSubmit}>
					<div className="paymentForm">
						<CardElement />
					</div>
					<button>Pay</button>
				</form>
			) : (
				<div>
					<h3>Payment Complete!</h3>
				</div>
			)}
		</>
	);
}
