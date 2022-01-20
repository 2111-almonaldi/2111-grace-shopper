import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import AllProducts from "./components/AllProducts";
import SingleProduct from "./components/SingleProduct";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import Cart from "./components/Cart";
import CheckoutMain from "./components/Checkout/CheckoutMain";
import AccountEdit from "./components/User/AccountEdit";
import Orders from "./components/User/Orders";
// import OrderDetails from './components/User/OrderDetails';
import UserMain from "./components/User/UserMain";
import PendingCarts from "./components/User/PendingCarts";
import { me } from "./store";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51KIhdSBUe6p65tjNXtHN5NUIQVk30J1x34GqAuvZZZc4QYJ7m2FHOiEjIbfyIkNGXAT2Km74UYnJ5BYJfZ442nIQ00QqawjRra"
);

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }
  render() {
    const { isLoggedIn } = this.props;
    return (
      <div className="main-container">
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/" component={AllProducts} />
            <Route path="/home" component={Home} />
            <Route exact path="/cart" component={Cart} />
            <Route path="/cart/pendingcarts" component={PendingCarts} />
            <Route path="/users/:id" component={UserMain} />
            <Route path="/users/:id/account" component={AccountEdit} />
            <Route path="/users/:id/orders" component={Orders} />
            <Route exact path="/products" component={AllProducts} />
            <Route path="/products/:id" component={SingleProduct} />
            <Elements stripe={stripePromise}>
              <Route path="/checkout" component={CheckoutMain} />
            </Elements>
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/products" component={AllProducts} />
            <Route path="/products/create" component={AddProduct} />
            <Route path="/products/:id/update" component={UpdateProduct} />
            <Route path="/products/:id" component={SingleProduct} />
            <Route path="/cart" component={Cart} />
            <Elements stripe={stripePromise}>
              <Route path="/checkout" component={CheckoutMain} />
            </Elements>
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
