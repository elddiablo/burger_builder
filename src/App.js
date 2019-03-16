import React, { Component, Suspense, lazy } from 'react';

import BurgerBuilder from '../src/containers/BurgerBuilder/BurgerBuilder';
import Layout from '../src/components/Layout/Layout';
import Logout from './components/Logout/Logout';

import * as actions from './components/store/actions/index';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Spinner from './components/UI/Spinner/Spinner';

const Checkout = lazy(() => import('./containers/Checkout/Checkout'));
const Orders = lazy(() => import('./containers/Orders/Orders'));
const Auth = lazy(() => import('./containers/Auth/Auth'));

class App extends Component {

  componentDidMount = () => {
    this.props.onTryAutoSignUp();
  }

  render() {

    let routes = ( 
        <Switch>
          <Route path='/auth'   component={Auth}/>
          <Route path='/' exact component={BurgerBuilder}/>
          <Redirect to="/" />
        </Switch>
    );

    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/checkout'   component={Checkout}/>
          <Route path='/orders'     component={Orders}/>
          <Route path='/logout'     component={Logout}/>
          <Route path='/auth'       component={Auth}/>
          <Route path='/' exact     component={BurgerBuilder}/>
          <Redirect to="/" />
        </Switch>
      )
    }

    return(
      <Layout>
        <Suspense fallback={<Spinner />}>
          { routes }
        </Suspense>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
