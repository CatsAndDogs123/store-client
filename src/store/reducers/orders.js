import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  orders: [],
  error: false,
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ORDERS_START:
      return updateObject(state, { loading: true });
    case actionTypes.FETCH_ORDERS_FAIL:
      return updateObject(state, { loading: false, error: true });
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return updateObject(state, { orders: action.orders, loading: false, error: false });
    default:
      return state;
  }
};

export default reducer;
