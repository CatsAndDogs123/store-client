import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};

export const fetchOrdersFail = () => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL
  };
};

export const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

export const fetchOrders = () => {
  return async dispatch => {
    dispatch(fetchOrdersStart());
    try {
      const res = await axios.get('api/shop/orders');
      dispatch(fetchOrdersSuccess(res.data));
    } catch (e) {
      dispatch(fetchOrdersFail());
    }
  };
};
