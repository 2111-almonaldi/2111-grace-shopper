import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchSingleProduct, setSingleProduct } from "../store/singleProduct";
import { removeProduct } from "../store/products";
import { addToCart } from "../store/cart";
// import "../../public/singleProduct.css";

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
      <div>
        <div className="single-product" key={singleProduct.id}>
          <img
            src={singleProduct.imageUrl}
            style={{ width: "200px", height: "200px" }}
          />
          <div className="single-product-info">
            <div className="single-product-desc">
              <h1>{singleProduct.name}</h1>
              <div>{singleProduct.description}</div>
            </div>
            <div className="single-product-data-bottom">
              <div className="single-product-pricing">
                <p>Price: ${singleProduct.price}</p>
                <button onClick={() => this.props.addToCart(singleProduct)}>
                  Add to Cart
                </button>
              </div>
              <div className="admin-update-div">
              <Link
                className="page_links"
                to={`/products/${singleProduct.id}/update`}
              >
                click here to make changes
              </Link><br/>
              <button
                type="button"
                className="deleteBtn"
                onClick={() => {
                  this.props.removeProduct(singleProduct.id);
                }}
              >
                Permanently Delete
              </button>
            </div>
          </div>
        </div>
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
