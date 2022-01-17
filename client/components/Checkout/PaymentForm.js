import React, { useState } from 'react';
import axios from 'axios';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

//PERHAPS MOVE TO ANOTHER FILE FOR ORGANIZATION
const CARD_OPTIONS = {
	iconStyle: 'solid',
	style: {
		base: {
			iconColor: 'c4f0ff',
			color: '#fff',
			fontWeight: 500,
			fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
			fontSize: '16px',
			fontSmoothing: 'antialiased',
			':-webkit-autofill': { color: '#fce883' },
			// ': :placeholder': { color: '#87bbfd' },
		},
		invalid: {
			iconColor: '#ffc7ee',
			color: '#ffc7ee',
		},
	},
};

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
					amount,
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
					<fieldset className="paymentForm">
						<div className="paymentForm-Row">
							<CardElement />
						</div>
					</fieldset>
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
