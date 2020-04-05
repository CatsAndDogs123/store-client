import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import Input from '../UI/Input/Input';
import * as actions from '../../store/actions/index';

const elementConfig = {
  type: 'text',
  placeholder: 'Filter',
};

const elementType = 'input';

const Search = (props) => {
  const [enteredFilter, setEnteredFilter] = useState('');
  const inputRef = useRef();
  const { onFetchProducts } = props;

  useEffect(() => {
    const getData = (query) => {
      onFetchProducts(query);
    };
    if (enteredFilter === inputRef.current.value) {
      const query = enteredFilter.length === 0 ? '' : `?title=${enteredFilter}`;
      getData(query);
    }
  }, [enteredFilter, inputRef, onFetchProducts]);

  return (
    <React.Fragment>
      <Input
        elementType={elementType}
        elementRef={inputRef}
        elementConfig={elementConfig}
        value={enteredFilter}
        changed={(e) => setEnteredFilter(e.target.value)}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    prods: state.prods.products,
    error: state.prods.error,
    loading: state.prods.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchProducts: (query) => dispatch(actions.searchProdcuts(query)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
