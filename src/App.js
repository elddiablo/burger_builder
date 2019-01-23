import React, { Component } from 'react';
import BurgerBuilder from '../src/containers/BurgerBuilder/BurgerBuilder';
import Layout from '../src/components/Layout/Layout';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders'

import { Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return(
      <Layout>
        <Switch>
          <Route path='/checkout' component={Checkout}/>
          <Route path='/orders' component={Orders}/>
          <Route path='/' exact component={BurgerBuilder}/>
        </Switch>
      </Layout>
    );
  }
}

export default App;
