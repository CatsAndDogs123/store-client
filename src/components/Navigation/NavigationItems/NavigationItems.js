import React from 'react';

import './NavigationItems.css';
import NavigationItem from './NavigatonItem/NavigatonItem';

const navigationItems = () => (
  <ul className="NavigationItems">
    <NavigationItem link="/" active>
      Products
    </NavigationItem>
    <NavigationItem link="/cart" active>
      Cart
    </NavigationItem>
    <NavigationItem link="/orders" active>
      Orders
    </NavigationItem>
    <NavigationItem link="/add-product" active>
      Add Product
    </NavigationItem>
    <NavigationItem link="/admin-products" active>
      Admin Products
    </NavigationItem>
    <NavigationItem link="/auth" active>
      Authenticate
    </NavigationItem>
  </ul>
);

export default navigationItems;
