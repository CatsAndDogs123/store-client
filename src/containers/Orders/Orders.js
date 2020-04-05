import React, { Component } from 'react';
import { connect } from 'react-redux';

import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import './Orders.css';

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders();
  }

  render() {
    let orders = this.props.error ? (
      <p style={{ textAlign: 'center' }}>Failed to load orders</p>
    ) : (
      <Spinner />
    );
    if (this.props.ordrs.length !== 0) {
      orders = this.props.ordrs.map(order => {
        const products = order.products.map(product => {
          console.log(product);
          return (
            <li key={product._id}>
              {product.product.title} ({product.quantity})
            </li>
          );
        });
        return (
          <li key={order._id}>
            <h4>Order - # {order._id}</h4>
            <ul>{products}</ul>
          </li>
        );
      });
    }
    return (
      <div className="Orders">
        <ul>{orders}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ordrs: state.ordrs.orders,
    loading: state.ordrs.loading,
    error: state.ordrs.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders);
