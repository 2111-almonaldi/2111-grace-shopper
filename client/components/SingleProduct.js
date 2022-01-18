import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchSingleProduct, setSingleProduct } from "../store/singleProduct";
import { removeProduct } from "../store/products";
import { addToCart } from "../store/cart";
import "../../public/singleProduct.css";

export class SingleProduct extends Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.clearProduct();
  }

  render() {
    const { singleProduct } = this.props;

    return (
      <div className="product">
        <div key={singleProduct.id}>
          <img
            src={singleProduct.imageUrl}
            style={{ width: "200px", height: "200px" }}
          />
          <h1>{singleProduct.name}</h1>
          <div>{singleProduct.description}</div>
          <div>Price: ${singleProduct.price}</div>
          <button onClick={() => this.props.addToCart(singleProduct)}>
            Add to Cart
          </button>
        </div>
        <div>
          <Link
            className="page_links"
            to={`/products/${singleProduct.id}/update`}
          >
            Update
          </Link>
          <button
            type="button"
            className="deleteBtn"
            onClick={() => {
              this.props.removeProduct(singleProduct.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  singleProduct: state.singleProduct,
});

const mapDispatch = (dispatch, { history }) => ({
  getProduct: (id) => dispatch(fetchSingleProduct(id)),
  removeProduct: (id) => dispatch(removeProduct(id, history)),
  clearProduct: () => dispatch(setSingleProduct({})),
  addToCart: (product) => dispatch(addToCart(product)),
});

export default connect(mapState, mapDispatch)(SingleProduct);
