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
          <Route
            path="http://storeee-storey.apps.ocp-eu2.prod.nextcle.com/add-product"
            exact
            component={AddProduct}
          />
          <Route
            path="http://storeee-storey.apps.ocp-eu2.prod.nextcle.com/cart"
            exact
            component={Cart}
          />
          <Route
            path="http://storeee-storey.apps.ocp-eu2.prod.nextcle.com/orders"
            exact
            component={Orders}
          />
          <Route
            path="http://storeee-storey.apps.ocp-eu2.prod.nextcle.com/auth"
            exact
            component={Auth}
          />
          <Route
            path="http://storeee-storey.apps.ocp-eu2.prod.nextcle.com/"
            exact
            component={Products}
          />
          <Route
            path="http://storeee-storey.apps.ocp-eu2.prod.nextcle.com/:id"
            exact
            component={Details}
          />
          <Route render={() => <h1>Not found</h1>} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
