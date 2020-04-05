import React from 'react';

import './ActionButton.css';

const actionButton = props => (
  <button
    className="ActionButton"
    style={props.style}
    onClick={props.clicked}
    disabled={props.disabled}
  >
    {props.children}
  </button>
);

export default actionButton;
