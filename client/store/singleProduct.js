import axios from 'axios';

const SET_SINGLEPRODUCT = 'SET_SINGLEPRODUCT';

export const setSingleProduct = (product) => ({
	type: SET_SINGLEPRODUCT,
	product,
});

//NOTE: REMEMBER TO Q.C. ROUTE BELOW ONCE API/DB IS SEEDED
export const fetchSingleProduct = (id) => async (dispatch) => {
	try {
		const { data: product } = await axios.get(`/api/products/${id}`);
		dispatch(setSingleProduct(product));
	} catch (error) {
		console.log('fetchSingleProduct thunk error!', error);
	}
};

export default function singleProductReducer(singleProduct = {}, action) {
	switch (action.type) {
		case SET_SINGLEPRODUCT:
			return action.product;
		default:
			return singleProduct;
	}
}
