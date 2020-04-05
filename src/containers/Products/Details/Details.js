import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from 'axios';
import Spinner from '../../../components/UI/Spinner/Spinner';
import ActionButton from '../../../components/UI/ActionButton/ActionButton';
import * as actions from '../../../store/actions/index';
import './Details.css';

class Details extends Component {
  state = {
    product: null
  };

  async componentDidMount() {
    try {
      console.log(this.props.match.url);
      const res = await axios.get('/api/shop/products' + this.props.match.url);
      console.log(res.data);
      this.setState({ product: res.data });
    } catch (e) {
      console.log(e);
    }
  }

  onAddToCart = () => {
    this.props.onAddProduct(this.props.match.url.slice(1));
    this.props.history.push('/');
  };

  render() {
    let product = <Spinner />;
    if (this.props.loading) {
      product = <Spinner />;
    }
    if (this.state.product) {
      product = (
        <div className="ProductDetails">
          <h2>{this.state.product.title}</h2>
          <hr></hr>
          <h4>{this.state.product.price}</h4>
          <p>{this.state.product.descreption}</p>
          <ActionButton clicked={this.onAddToCart}>Add to Cart</ActionButton>
        </div>
      );
    }
    return <div>{product}</div>;
  }
}

const mapStateToProps = state => {
  return {
    loading: state.prods.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddProduct: id => dispatch(actions.addProduct(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);
