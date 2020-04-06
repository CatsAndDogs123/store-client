import * as actionsTypes from './actionTypes';
import axios from 'axios';

export const fetchProductsStart = () => {
  return {
    type: actionsTypes.FETCH_PRODUCTS_START,
  };
};

export const fetchProductsFail = () => {
  return {
    type: actionsTypes.FETCH_PRODUCTS_FAIL,
  };
};

export const setCart = (products) => {
  return {
    type: actionsTypes.FETCH_PRODUCTS_SUCCESS,
    products: products,
  };
};

export const fetchProducts = () => {
  return async (disaptch) => {
    disaptch(fetchProductsStart());
    try {
      const res = await axios.get(`${process.env.REACT_APP_STORE_API}/api/shop/products`);
      disaptch(setCart(res.data));
    } catch (e) {
      disaptch(fetchProductsFail());
    }
  };
};

export const setAddProduct = () => {
  return {
    type: actionsTypes.ADD_PRODUCT,
  };
};

export const addProduct = (id) => {
  return async (dispatch) => {
    dispatch(fetchProductsStart());
    try {
      const data = {
        productId: id,
      };
      await axios.post('api/shop/cart-post-item', data);
      dispatch(setAddProduct());
    } catch (e) {
      dispatch(fetchProductsFail());
    }
  };
};

export const createProductSuccess = (id, productData) => {
  return {
    type: actionsTypes.CREATE_PRODUCT,
    productId: id,
    productData: productData,
  };
};

export const createProduct = (productData) => {
  return async (dispatch) => {
    dispatch(fetchProductsStart());
    try {
      const res = await axios.post('/api/admin/add-product', productData);
      console.log(res.data, 'ressss done');
      dispatch(createProductSuccess(res.data, productData));
    } catch (e) {
      dispatch(fetchProductsFail());
    }
  };
};

export const searchProdcuts = (query) => {
  return async (dispatch) => {
    dispatch(fetchProductsStart());
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_STORE_API}/api/shop/filtered-products` + query
      );
      console.log(res, ' res');
      dispatch(setCart(res.data));
    } catch (e) {
      dispatch(fetchProductsFail());
    }
  };
};
