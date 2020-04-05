import * as actionsTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  cart: [],
  error: false,
  loading: false
};

const cartCheckoutStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchCartSuccess = (state, action) => {
  return updateObject(state, { cart: action.cart, error: false, loading: false });
};

const fetchCartFail = (state, action) => {
  return updateObject(state, { error: true, loading: false });
};

const increment = (state, action) => {
  const updatedArrayInc = state.cart.map(item => {
    if (item.productId === action.productId) {
      return {
        ...item,
        quantity: item.quantity + 1
      };
    }
    return item;
  });
  return updateObject(state, { cart: updatedArrayInc, loading: false });
};

const decrement = (state, action) => {
  const updatedArrayDec = state.cart.map(item => {
    if (item.productId === action.productId) {
      return {
        ...item,
        quantity: item.quantity - 1
      };
    }
    return item;
  });
  return updateObject(state, { cart: updatedArrayDec, loading: false });
};

const deleteProduct = (state, action) => {
  const updatedArrayDelete = state.cart.filter(
    product => product.productId._id !== action.productId
  );
  return updateObject(state, { cart: updatedArrayDelete, loading: false });
};

const cartCheckoutSuccess = (state, action) => {
  return updateObject(state, { loading: false, cart: [] });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.CART_CHECKOUT_START:
      return cartCheckoutStart(state, action);
    case actionsTypes.FETCH_CART_SUCCESS:
      return fetchCartSuccess(state, action);
    case actionsTypes.FETCH_CART_FAIL:
      return fetchCartFail(state, action);
    case actionsTypes.INCREMENT:
      return increment(state, action);
    case actionsTypes.DECREMENT:
      return decrement(state, action);
    case actionsTypes.DELETE:
      return deleteProduct(state, action);
    case actionsTypes.CART_CHECKOUT_SUCCESS:
      return cartCheckoutSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
