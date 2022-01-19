import React, { Component } from 'react';
import { connect } from 'react-redux';

export class UserMain extends Component {
	render() {
		const { auth } = this.props;

		return <div>hello, {auth.lastName}!</div>;
	}
}

const mapState = (state) => ({
	auth: state.auth,
});

export default connect(mapState)(UserMain);
