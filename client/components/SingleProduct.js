import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSingleProduct } from '../store/singleProduct';
import '../../public/singleProduct.css';

export class SingleProduct extends Component {
	componentDidMount() {
		this.props.getProduct(this.props.match.params.id);
	}

	render() {
		const { singleProduct } = this.props;

		return (
			<div className="product">
				<div key={singleProduct.id}>
					<img
						src={singleProduct.imageUrl}
						style={{ width: '200px', height: '200px' }}
					/>
					<h1>{singleProduct.name}</h1>
					<div>{singleProduct.description}</div>
					<div>Price: ${singleProduct.price}</div>
					<button type="button" className="button">
						Add To Cart
					</button>
				</div>
				<div>
					<Link className="page_links" to={`/products/${singleProduct.id}/update`}>Update</Link>
				</div>

			</div>
		);
	}
}

const mapState = (state) => ({
	singleProduct: state.singleProduct,
});

const mapDispatch = (dispatch) => ({
	getProduct: (id) => dispatch(fetchSingleProduct(id)),
});

export default connect(mapState, mapDispatch)(SingleProduct);
