import React from "react";
import { connect } from "react-redux";
import { loadProducts } from "../store/products";
import { Link } from "react-router-dom";

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.loadProducts();
  }

  render() {
    const { products } = this.props;

    return (
      <div className="products">
        {products.map((product, index) => {
          return (
            <div className="product" key={index}>
              <img src={product.imageUrl} />
              <div className="product-info">
                <h5>
                  <Link className="page_links" to={`/products/${index + 1}`}>
                    {product.name}
                  </Link>
                </h5>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <button onClick={() => this.props.addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadProducts: () => dispatch(loadProducts()),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
