import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateProduct } from '../redux/campuses';
import { setSingleProduct, fetchSingleProduct } from '../store/singleProduct';

class UpdateProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      imageUrl: '',
      price: '',
      quantity: '',
      description: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.toggle = this.toggle.bind(this);
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
        address: this.props.singleProduct.quantity || '',
        address: this.props.singleProduct.price || '',
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

    const campus = this.props.singleCampus || {};

    return (
      <div className='form-container'>
            <form className='product_form' onSubmit={handleSubmit}>
                <div>
                  <label htmlFor='name'>Campus Name</label><br/>
                  <input name='name' onChange={handleChange} value={name} />
                </div>

                <div>
                  <label htmlFor='imageUrl'>Image</label><br/>
                  <textarea name='imageUrl' onChange={handleChange} value={imageUrl} rows="2" cols="41" />
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
                  <textarea name='description' onChange={handleChange} value={description} rows="2" cols="41" className='formDesc' />
                </div><br/>

                <div>
                  <button type='submit'>Save</button>
                </div><br/>
              <Link className='cancel' to='/products'>Click Here to Cancel</Link>
            </form> <br/>

      </div>
    );
  }
}

const mapStateToProps = ({singleProduct}) => ({
    singleProduct
  });

const mapDispatchToProps = (dispatch, { history }) => ({
    updateProduct: (product) => dispatch(updateProduct(product, history)),
    fetchSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
    clearProduct: () => dispatch(setSingleProduct({}))
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProduct)