import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addNewProduct, loadProducts } from '../store/products';

class AddProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      imageUrl: "",
      price: "",
      quantity: "",
      description: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.addNewProduct({ ...this.state });
  }

  render() {
    const { name, imageUrl, price, quantity, description } = this.state;
    const { handleSubmit, handleChange} = this;

    return (
      <div className='form-container'>
        <form className='product-form' onSubmit={handleSubmit}>
          <div>
          <label htmlFor='name'>Movie Name</label><br/>
          <input name='name' onChange={handleChange} value={name} />
          </div>

          <div>
          <label htmlFor='imageUrl'>Image</label><br/>
          <textarea name='imageUrl' onChange={handleChange} value={imageUrl}  rows="2" cols="41" />
          </div>

          <div>
          <label htmlFor='price'>Price</label><br/>
          <input name='price' onChange={handleChange} value={price} />
          </div>

          <div>
          <label htmlFor='quantity'>Quantity</label><br/>
          <input name='quantity' onChange={handleChange} value={quantity} />
          </div>

          <div>
          <label htmlFor='description'>Description</label><br/>
          <textarea name='description' onChange={handleChange} value={description} rows="2" cols="41" />
          </div>

          <br/>

          <div>
          <button type='submit'>Submit</button>
          </div>

          <br/>

          <Link className='cancel' to='/products'>Click Here To Cancel</Link>
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch, { history }) => ({
    addNewProduct: (product) => dispatch(addNewProduct(product, history))
});

export default connect(null, mapDispatch)(AddProduct)