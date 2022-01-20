import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateProduct } from '../../store/products';
import { setSingleProduct, fetchSingleProduct } from '../../store/singleProduct';

class UpdateProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      imageUrl: '',
      price: 0,
      quantity: 0,
      description: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.clearProduct();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.singleProduct.id !== this.props.singleProduct.id) {
      this.setState({
        name: this.props.singleProduct.name || '',
        imageUrl: this.props.singleProduct.imageUrl || '',
        quantity: this.props.singleProduct.quantity || 0,
        price: this.props.singleProduct.price || 0,
        description: this.props.singleProduct.description || '',
      });
    }
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.updateProduct({ ...this.props.singleProduct, ...this.state });
  }

  render() {
    const { name, imageUrl, price, quantity, description } = this.state;
    const { handleSubmit, handleChange } = this;

    return (
      <div className='form-container'>
            <form className='product_form main-form' onSubmit={handleSubmit}>
                <div>
                  <label className="form-label" htmlFor='name'>Product Name</label><br/>
                  <input className="form-input" name='name' onChange={handleChange} value={name} />
                </div>

                <div>
                  <label className="form-label" htmlFor='imageUrl'>Image</label><br/>
                  <textarea className="form-textarea" name='imageUrl' onChange={handleChange} value={imageUrl} rows="2" cols="41" />
                </div>

                <div>
                  <label className="form-label" htmlFor='price'>Price</label><br/>
                  <input className="form-input" name='price' onChange={handleChange} value={price} />
                </div>

                <div>
                <label className="form-label" htmlFor='quantity'>Quantity</label><br/>
                <input className="form-input" name='quantity' onChange={handleChange} value={quantity} />
                </div>

                <div>
                  <label className="form-label" htmlFor='description'>Description</label><br/>
                  <textarea className="form-textarea" name='description' onChange={handleChange} value={description} rows="3" cols="41" className='formDesc' />
                </div><br/>

                <div>
                  <button className="form-button" type='submit'>Save</button>
                </div><br/>
            <Link className='cancel' to='/products'>Click Here to Cancel</Link>
            </form>
      </div>
    );
  }
}

const mapState = (state) => ({
    singleProduct: state.singleProduct
  });

const mapDispatch = (dispatch, { history }) => ({
    updateProduct: (product) => dispatch(updateProduct(product, history)),
    fetchSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
    clearProduct: () => dispatch(setSingleProduct({}))
});

export default connect(mapState, mapDispatch)(UpdateProduct);
