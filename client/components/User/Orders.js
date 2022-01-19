import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../../public/userOrders.css';

export class Orders extends Component {
	render() {
		const { auth } = this.props;

		return (
			<div>
				<div className="orders">
					{auth.orders.map((order, index) => {
						return (
							<div key={index}>
								<div>{order.id}</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

const mapState = (state) => ({
	auth: state.auth,
});

export default connect(mapState)(Orders);
