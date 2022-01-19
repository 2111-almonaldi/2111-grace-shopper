import React, { Component } from 'react';
import { connect } from 'react-redux';

export class AccountEdit extends Component {
	render() {
		const { auth } = this.props;

		return (
			<div>
				<div>{auth.firstName}'s User Account Information:</div>
				<div>Username: {auth.username}</div>

				<div>First Name: {auth.firstName}</div>
				<div>Last Name: {auth.lastName}</div>
				<div>Email: {auth.email}</div>
			</div>
		);
	}
}

const mapState = (state) => ({
	auth: state.auth,
});

export default connect(mapState)(AccountEdit);
