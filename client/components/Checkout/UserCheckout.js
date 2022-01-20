import React from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';

const UserCheckout = ({ auth }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		useDefault: {
			customerEmail: auth.email,
			customerName: auth.fullName,
		},
	});

	return (
		<form
			onSubmit={handleSubmit((data) => {
				console.log(data);
			})}
		>
			<input
				{...register('customerEmail', { required: 'This field is required' })}
				placeholder="Email"
			/>
			<div>{errors.customerEmail?.message}</div>
			<input
				{...register('customerName', { required: 'This field is required' })}
				placeholder="Name"
			/>
			<div>{errors.customerName?.message}</div>
			<input
				{...register('customerAddress', { required: 'This field is required' })}
				placeholder="Address Line 1"
			/>
			<div>{errors.customerAddress?.message}</div>
			<input
				{...register('customerCity', { required: 'This field is required' })}
				placeholder="City"
			/>
			<div>{errors.customerCity?.message}</div>
			<input
				{...register('customerState', { required: 'This field is required' })}
				placeholder="State"
			/>
			<div>{errors.customerState?.message}</div>
			<input {...register('customerZip')} placeholder="Zip Code" />
			<input
				{...register('customerPhone', { required: false })}
				placeholder="Phone (Optional)"
			/>
			<input type="submit" />
		</form>
	);
};

const mapState = (state) => ({
	auth: state.auth,
});

export default connect(mapState)(UserCheckout);
