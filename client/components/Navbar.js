import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { clearCart } from '../store/cart';
import { createOrder, updateOrder } from '../store/order';
import { logoutOrder, clearOrder } from '../store/order';
import '../../public/navbar.css';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const Navbar = ({ handleClick, isLoggedIn, cart }) => (
	<div className="header">
		{isLoggedIn ? (
			<div className="header">
				<Link to="/home">
					<img
						className="header-image"
						src="https://i.pinimg.com/564x/10/f8/bd/10f8bdfb863dee8714e3594e4c79b563.jpg"
						alt=""
					/>
				</Link>
				<div className="header-nav">
					{/* The navbar will show these links after you log in */}
					<span>Hello, User</span>
					<Link to="/users/:id">
						<span>Account Details</span>
					</Link>
					<Link to="/products">
						<span>Products</span>
					</Link>
					<a href="#" onClick={handleClick}>
						<span>Logout</span>
					</a>
					{cart.length === 0 ? (
						<Link to="/cart">
							<ShoppingCartRoundedIcon />
						</Link>
					) : (
						<Link to="/cart">
							<ShoppingCartRoundedIcon />(
							{cart.reduce((a, c) => a + c.count, 0)})
						</Link>
					)}
					<Link to="/cart/pendingcarts"> Pending Carts </Link>
				</div>
			</div>
		) : (
			<div className="header">
				<Link to="/home">
					<img
						className="header-image"
						src="https://i.pinimg.com/564x/10/f8/bd/10f8bdfb863dee8714e3594e4c79b563.jpg"
						alt=""
					/>
				</Link>
				<div className="header-nav">
					{/* The navbar will show these links before you log in */}
					<span>
						<Link to="/login">Login</Link>
					</span>
					<span>
						<Link to="/signup">Sign Up</Link>
					</span>
					<span>
						<Link to="/products">Products</Link>
					</span>
					<span>Admin Panel</span>
						<Link to="/admin">
							<AdminPanelSettingsIcon />
						</Link>
					<span>
						{cart.length === 0 ? (
							<Link to="/cart">
								<ShoppingCartRoundedIcon />
							</Link>
						) : (
							<Link to="/cart">
								<ShoppingCartRoundedIcon />(
								{cart.reduce((a, c) => a + c.count, 0)})
							</Link>
						)}
					</span>
				</div>
			</div>
		)}
	</div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		isLoggedIn: !!state.auth.id,
		cart: state.cart.cartItems,
	};
};

const mapDispatch = (dispatch) => {
	return {
		handleClick() {
			dispatch(logoutOrder());
			dispatch(logout());
			//dispatch(clearCart());
		},
	};
};

export default connect(mapState, mapDispatch)(Navbar);
