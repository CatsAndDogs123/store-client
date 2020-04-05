import React, { Component } from 'react';
import { connect } from 'react-redux';

import Product from '../../components/Product/Product';
import Spinner from '../../components/UI/Spinner/Spinner';
import Search from '../../components/Search/Search';
import * as actionCreators from './../../store/actions/index';
import './Products.css';

class Products extends Component {
  state = {
    products: []
  };

  componentDidMount() {
    this.props.onFetchProducts();
  }

  onClickDetails = id => {
    this.props.history.push({ pathname: '/' + id });
  };

  onAddToCart = id => {
    this.props.onAddProduct(id);
  };

  render() {
    let products = this.props.error ? <p>failed to load products</p> : <Spinner />;
    if (this.props.prods.length === 0 && !this.props.loading && !this.props.error) {
      products = <p>There are no products</p>;
    }
    if (this.props.prods.length !== 0) {
      products = this.props.prods.map(product => (
        <Product
          key={product._id}
          title={product.title}
          price={product.price}
          description={product.description}
          clickedDetails={() => this.onClickDetails(product._id)}
          clickedAdd={() => this.onAddToCart(product._id)}
        />
      ));
    }
    if (this.props.loading) {
      products = <Spinner />;
    }
    // TODO fix search it fucks up the app
    return (
      <React.Fragment>
        <Search />
        <div className="Products">{products}</div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    prods: state.prods.products,
    error: state.prods.error,
    loading: state.prods.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchProducts: () => dispatch(actionCreators.fetchProducts()),
    onAddProduct: id => dispatch(actionCreators.addProduct(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);
