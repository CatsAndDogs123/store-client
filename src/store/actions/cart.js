import * as actionsTypes from './actionTypes';
import axios from 'axios';

export const fetchCartFail = () => {
  return {
    type: actionsTypes.FETCH_CART_FAIL
  };
};

export const setCart = cart => {
  return {
    type: actionsTypes.FETCH_CART_SUCCESS,
    cart: cart
  };
};

export const fetchCart = () => {
  return async dispatch => {
    try {
      dispatch(checkoutCartStart());
      const res = await axios.get('api/shop/cart');
      dispatch(setCart(res.data));
    } catch (e) {
      dispatch(fetchCartFail());
    }
  };
};

export const setIncremenet = id => {
  return {
    type: actionsTypes.INCREMENT,
    productId: id
  };
};

export const incrementProduct = id => {
  return async dispatch => {
    dispatch(checkoutCartStart());
    try {
      const data = {
        productId: id
      };
      await axios.post('api/shop/cart-post-item', data);
      dispatch(setIncremenet(id));
    } catch (e) {
      dispatch(fetchCartFail());
    }
  };
};

export const setDecrement = id => {
  return {
    type: actionsTypes.DECREMENT,
    productId: id
  };
};

export const decrementProduct = id => {
  return async dispatch => {
    try {
      dispatch(checkoutCartStart());
      const data = {
        productId: id
      };
      await axios.post('api/shop/cart-post-item-reduce', data);
      dispatch(setDecrement(id));
    } catch (e) {
      dispatch(fetchCartFail());
    }
  };
};

export const setProductAfterDelete = id => {
  return {
    type: actionsTypes.DELETE,
    productId: id
  };
};

export const deleteProduct = id => {
  return async dispatch => {
    dispatch(checkoutCartStart());
    try {
      const data = {
        productId: id
      };
      await axios.post('api/shop/cart-delete-item', data);
      dispatch(setProductAfterDelete(id));
    } catch (e) {
      dispatch(fetchCartFail());
    }
  };
};

export const checkoutCartStart = () => {
  return {
    type: actionsTypes.CART_CHECKOUT_START
  };
};

export const checkoutCartSuccess = () => {
  return {
    type: actionsTypes.CART_CHECKOUT_SUCCESS
  };
};

export const checkoutCart = () => {
  return async dispatch => {
    dispatch(checkoutCartStart());
    try {
      await axios.post('api/shop/create-order');
      dispatch(checkoutCartSuccess());
    } catch (e) {
      dispatch(fetchCartFail());
    }
  };
};
