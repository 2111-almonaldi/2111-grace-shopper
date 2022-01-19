import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../../public/userMain.css';
import PersonIcon from '@mui/icons-material/Person';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountEdit from './AccountEdit';
import Orders from './Orders';
import { Link } from 'react-router-dom';

export class UserMain extends Component {
	render() {
		const { auth } = this.props;

		return (
			<div className="user-container">
				<div className="user-header">
					<h2>{auth.fullName} Account Page</h2>
				</div>

				<div className="user-aboutMe">
					<div>{<AccountEdit /> || <Orders />}</div>
				</div>

				<div className="sides user-left">
					<h5>Your Account</h5>
					<li className="sidebar-List">
						<ol>
							<Link to="/users/:id/account">
								<PersonIcon className="sidebar-Icon" />
								<span>Account Info</span>
							</Link>
						</ol>
						<ol>
							{/* <Link to="/users/:id"> */}
							<LocalShippingIcon className="sidebar-Icon" />
							<span>Saved Addresses</span>
							{/* </Link> */}
						</ol>
						<ol>
							<Link to="/users/:id/orders">
								<ShoppingCartIcon className="sidebar-Icon" />
								<span>Orders</span>
							</Link>
						</ol>
						<ol>
							{/* <Link to="/users/:id"> */}
							<ListAltIcon className="sidebar-Icon" />
							<span>Lists</span>
							{/* </Link> */}
						</ol>
					</li>
				</div>

				<div className="sides user-right"></div>

				<div className="user-footer"></div>
			</div>
		);
	}
}

const mapState = (state) => ({
	auth: state.auth,
});

export default connect(mapState)(UserMain);
