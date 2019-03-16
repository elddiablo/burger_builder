import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

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
        let summary = <Redirect to="/" />;
        
        if(this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null;
            summary = 
            <>
                {purchasedRedirect}
                <CheckoutSummary 
                    ingredients={this.props.ings} 
                    checkoutCanceled = {this.checkoutCanceled}
                    checkoutContinued = {this.checkoutContinued}
                />
                <Route 
                    path={this.props.match.url + '/contact-data'}
                    component={ContactData}
                />
            </>
        }

        return summary;
    }

}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);

