import React from 'react';

import shiledLogo from '../../assets/images/shiled-logo.jpg';
import './Logo.css';

const logo = props => (
  <div className="Logo">
    <img src={shiledLogo} alt="shiled" />
  </div>
);

export default logo;
