import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

import Spinner from '../../components/UI/Spinner/Spinner';
import ActionButton from '../../components/UI/ActionButton/ActionButton';
import Button from '../../components/UI/Button/Button';
import './Cart.css';

class Cart extends Component {
  componentDidMount() {
    this.props.onFetchCart();
  }

  onDeleteProduct = id => {
    this.props.onDelete(id);
  };

  onCheckoutHandler = async () => {
    this.props.onCartCheckout();
  };

  render() {
    let cart = this.props.error ? <p>failed to load cart</p> : <Spinner />;
    if (this.props.loading) {
      cart = <Spinner />;
    }
    if (this.props.crt.length === 0 && !this.props.loading && !this.props.error) {
      cart = <p>There are no products in cart</p>;
    }
    if (this.props.crt.length !== 0 && !this.props.loading) {
      cart = this.props.crt.map(crtItem => (
        <li key={crtItem._id} style={{ margin: '15px' }}>
          <h4>{crtItem.productId.title}</h4>

          <h4 style={{ margin: '0 20px', marginLeft: '160px' }}>
            Quantity: {crtItem.quantity}
          </h4>
          <div>
            <button
              style={{ border: '1px solid green', color: 'green' }}
              onClick={() => this.props.onIncrement(crtItem.productId)}
            >
              +
            </button>
            <button
              style={{ border: '1px solid red', color: 'red', padding: '1px 7.672px' }}
              onClick={() => this.props.onDecrement(crtItem.productId)}
              disabled={crtItem.quantity === 1 ? true : false}
            >
              -
            </button>
          </div>

          <ActionButton clicked={() => this.onDeleteProduct(crtItem.productId._id)}>
            Delete
          </ActionButton>
        </li>
      ));
    }
    return (
      <div className="Cart">
        <ul className="CartItem">{cart}</ul>
        {this.props.crt.length !== 0 && !this.props.loading && !this.props.error ? (
          <hr></hr>
        ) : null}
        {this.props.crt.length !== 0 && !this.props.loading && !this.props.error ? (
          <Button clicked={this.onCheckoutHandler} btnType="Success">
            Checkout
          </Button>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    crt: state.crt.cart,
    error: state.crt.error,
    loading: state.crt.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchCart: () => dispatch(actionCreators.fetchCart()),
    onIncrement: id => dispatch(actionCreators.incrementProduct(id)),
    onDecrement: id => dispatch(actionCreators.decrementProduct(id)),
    onDelete: id => dispatch(actionCreators.deleteProduct(id)),
    onCartCheckout: () => dispatch(actionCreators.checkoutCart())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
