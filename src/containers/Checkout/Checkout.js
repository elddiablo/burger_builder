import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import ContactData from './ContactData/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

import { connect } from 'react-redux';

class Checkout extends Component {
    
    checkoutCanceled = () => {
        this.props.history.goBack();
    }
    checkoutContinued = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return(
            <div>
                <CheckoutSummary ingredients={this.props.ings} checkoutCanceled = {this.checkoutCanceled}
                checkoutContinued = {this.checkoutContinued}
                />
                <Route 
                    path={this.props.match.url + '/contact-data'}
                    component={ContactData}
                />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);

