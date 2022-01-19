import React from "react";
import { connect } from "react-redux";
import { loadProducts } from "../store/products";
import { Link } from "react-router-dom";
import { addToCart } from "../store/cart";
import Pagination from "@material-ui/lab/Pagination"
import { Route } from "react-router-dom";
import PaginationItem from "@material-ui/lab/PaginationItem";
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import { getParam, setParam } from "../utility-funcs/query";
import { DEFAULT_PAGE_SIZE} from "../../constants";
export class AllProducts extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.loadProducts();
  }

  render() {
    const { products } = this.props;

    return (
      <div className="products">
        <Link className="newProductLink" to="/products/create">
          Add Product
        </Link>
        {products.map((product, index) => {
          return (
            <div className="product" key={index}>
              <img className="product-img" src={product.imageUrl} />
              <div className="product-info">
                <div className="product-desc">
                  <h5>
                    <Link className="page_links" to={`/products/${index + 1}`}>
                      {product.name}
                    </Link>
                  </h5>
                  <p className="description">{product.description}</p>
                </div>
                <div className="product-total">
                  <p className="product-price">Price: ${product.price}</p>
                  <button onClick={() => this.props.addToCart(product)}>
                    Add to Cart
                  </button>
                </div>
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
    addToCart: (product) => dispatch(addToCart(product)),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
