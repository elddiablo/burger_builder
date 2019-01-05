import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import ContactData from './ContactData/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {

    state = {
        ingredients: null,
        totalPrice: 0
    }
    
    componentWillMount() {  
        const query = new URLSearchParams(this.props.location.search);
        let ingredients = {};
        let price = null;
        for(let param of query.entries()) {
            if(param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] =+ param[1];
            }
        }
        this.setState({ingredients: ingredients, totalPrice: price});
    }
    checkoutCanceled = () => {
        this.props.history.goBack();
    }
    checkoutContinued = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return(
            <div>
                <CheckoutSummary ingredients={this.state.ingredients} checkoutCanceled = {this.checkoutCanceled}
                checkoutContinued = {this.checkoutContinued}
                />
                <Route path={this.props.match.url + '/contact-data'} 
                    render = {(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}
                />
            </div>
        );
    }

}

export default Checkout;

