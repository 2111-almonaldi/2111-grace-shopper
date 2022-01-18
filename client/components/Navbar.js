import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { clearCart } from '../store/cart';
import { createOrder, updateOrder } from '../store/order';
import '../../public/navbar.css';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';

const Navbar = ({ handleClick, isLoggedIn, cart }) => (
	<div className="header">
		{isLoggedIn ? (
			<div>
				<Link to="/home">
					<img
						className="header-image"
						src="https://i.pinimg.com/564x/10/f8/bd/10f8bdfb863dee8714e3594e4c79b563.jpg"
						alt=""
					/>
				</Link>
				<div className="header-space"></div>
				<div className="header-nav">
					<div className="header-option">
						{/* The navbar will show these links after you log in */}
						<span className="header-optionLineOne">Hello, User</span>

						<span className="header-optionLineTwo">Account Details</span>

						<Link to="/products">
							<span className="header-optionLineThree">Products</span>
						</Link>

						<a href="#" onClick={handleClick}>
							<span className="header-optionLineFour">Logout</span>
						</a>

						<div className="header-optionBasket">
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
						</div>
					</div>
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
				<div className="header-nav"></div>
				<div className="header-option">
					{/* The navbar will show these links before you log in */}
					<span className="header-optionLineOne">
						<Link to="/login">Login</Link>
					</span>

					<span className="header-optionLineTwo">
						<Link to="/signup">Sign Up</Link>
					</span>

					<span className="header-optionLineThree">
						<Link to="/products">Products</Link>
					</span>
				</div>

				<div className="header-optionBasket">
					{cart.length === 0 ? (
						<Link
							to="/cart"
							className="header-optionLineTwo header-basketCount"
						>
							<ShoppingCartRoundedIcon />
						</Link>
					) : (
						<Link
							to="/cart"
							className="header-optionLineTwo header-basketCount"
						>
							<ShoppingCartRoundedIcon />(
							{cart.reduce((a, c) => a + c.count, 0)})
						</Link>
					)}
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
			dispatch(logout());
			dispatch(clearCart());
		},
	};
};

export default connect(mapState, mapDispatch)(Navbar);
