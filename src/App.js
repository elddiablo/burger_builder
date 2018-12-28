import React, { Component } from 'react';
import BurgerBuilder from '../src/containers/BurgerBuilder/BurgerBuilder';
import Layout from '../src/components/Layout/Layout';


class App extends Component {
  render() {
    return(
      <Layout>
        <BurgerBuilder />
      </Layout>
    );
  }
}

export default App;
