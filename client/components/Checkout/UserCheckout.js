import React, { Component } from 'react';
import { connect } from 'react-redux';

export class UserCheckout extends Component {
	render() {
		const { auth } = this.props;

		return <div>hello {auth.username}</div>;
	}
}

const mapState = (state) => ({
	auth: state.auth,
});

export default connect(mapState)(UserCheckout);
