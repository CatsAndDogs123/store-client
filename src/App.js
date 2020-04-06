import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Layout from './containers/Layout/Layout';
import './App.css';
import AddProduct from './containers/AddProduct/AddProduct';
import Products from './containers/Products/Products';
import Details from './containers/Products/Details/Details';
import Cart from './containers/Cart/Cart';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';

function App() {
  return (
    <BrowserRouter>
      <Layout className="App">
        <Switch>
          <Route path="/add-product" exact component={AddProduct} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/orders" exact component={Orders} />
          <Route path="/auth" exact component={Auth} />
          <Route path="/" exact component={Products} />
          <Route path="/:id" exact component={Details} />
          <Route render={() => <h1>Not found</h1>} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
