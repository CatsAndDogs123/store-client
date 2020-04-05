import React from 'react';

import './Product.css';
import ActionButton from '../UI/ActionButton/ActionButton';

const product = props => {
  return (
    <div className="Product">
      <h5>{props.title}</h5>
      <h4>${props.price}</h4>
      <p>{props.description}</p>
      <div>
        <ActionButton clicked={props.clickedDetails}>Details</ActionButton>
        <ActionButton clicked={props.clickedAdd}>Add to Cart</ActionButton>
      </div>
    </div>
  );
};

export default product;
