import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  products: [],
  error: false,
  loading: false
};

const fetchProductStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchProductsSuccess = (state, action) => {
  return updateObject(state, { products: action.products, error: false, loading: false });
};

const fetchProductsFail = (state, action) => {
  return updateObject(state, { error: true, loading: false });
};

const addProduct = (state, action) => {
  return updateObject(state, { loading: false });
};

const createProduct = (state, action) => {
  const newProduct = updateObject(action.productData, { id: action.productId });
  return updateObject(state, {
    loading: false,
    products: state.products.concat(newProduct)
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS_START:
      return fetchProductStart(state, action);
    case actionTypes.FETCH_PRODUCTS_SUCCESS:
      return fetchProductsSuccess(state, action);
    case actionTypes.FETCH_PRODUCTS_FAIL:
      return fetchProductsFail(state, action);
    case actionTypes.ADD_PRODUCT:
      return addProduct(state, action);
    case actionTypes.CREATE_PRODUCT:
      return createProduct(state, action);
    default:
      return state;
  }
};

export default reducer;
