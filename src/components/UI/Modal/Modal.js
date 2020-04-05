import React from 'react';

import './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

const modal = props => (
  <React.Fragment>
    <Backdrop show={props.show} clicked={props.modalClosed} />
    <div
      className="Modal"
      style={{ opacity: props.show ? '1' : '0', transform: props.show ? 'translateY(0)' : 'translateY(-100vh' }}
    >
      {props.children}
    </div>
  </React.Fragment>
);

export default modal;
