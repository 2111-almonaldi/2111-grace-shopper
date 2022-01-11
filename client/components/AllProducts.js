import React from "react";
import { connect } from "react-redux";
import { loadProducts } from '../store/products';
import { Link } from "react-router-dom";

// Notice that we're exporting the AllStudents component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllProducts extends React.Component {
  componentDidMount () {
    this.props.loadProducts();
  }

  render() {
    const { products } = this.props;
    
    return (
      <div id='products'>
        {
          products.map(product => {
            return (
              <div className='product' key={product.id}>
                <img src={product.imageUrl} />
                <div className='product-info'>
                    <h5>
                      <Link className='page_links' to={`/products/${product.id}`}>{product.name}</Link>
                    </h5>
                  <p>{product.description}</p>
                  <p>Price: {product.price}</p>
                </div>
                
              </div>
            )
          })
        }
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    products: state.products
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadProducts: () => dispatch(loadProducts())
  };
};

export default connect(mapState, mapDispatch)(AllProducts);