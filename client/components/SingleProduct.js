import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleProduct } from '../store/singleProduct';
import '../../public/singleProduct.css';

const singleProductDummyData = [
	{
		id: 1,
		name: 'Titanic',
		price: 4.99,
		description:
			'a really sad movie about love. a ship sinks. based on true event.',
		imageUrl:
			'https://i.pinimg.com/originals/42/42/65/4242658e6f1b0d6322a4a93e0383108b.png',
		quantity: 1,
	},
];

export class SingleProduct extends Component {
	componentDidMount() {
		this.props.getProduct(this.props.match.params.id);
	}

	render() {
		const { singleProduct } = this.props;

		return (
			<div className="product">
				<div key={singleProductDummyData.id}>
					<img
						src={singleProductDummyData.imageUrl}
						style={{ width: '200px', height: '200px' }}
					/>
					<h1>{singleProductDummyData.name}</h1>
					<div>{singleProductDummyData.description}</div>
					<div>Price: ${singleProductDummyData.price}</div>
					<button type="button" className="button">
						Add To Cart
					</button>
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
