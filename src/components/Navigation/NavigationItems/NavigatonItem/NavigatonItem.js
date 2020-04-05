import React from 'react';

import './NavigatonItem.css';
import { NavLink } from 'react-router-dom';

const navigationItem = props => (
  <li className="NavigationItem">
    <NavLink to={props.link} exact activeClassName={props.active ? 'active' : null}>
      {props.children}
    </NavLink>
  </li>
);

export default navigationItem;
