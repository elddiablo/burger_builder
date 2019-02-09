import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import axios from '../../axios.orders';

import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandler';

import Spinner from '../../components/UI/Spinner/Spinner';


import { connect } from 'react-redux';
import * as burgerBuilderActions from '../../components/store/actions/index';




class BurgerBuilder extends Component {

    state = {
        totalPrice: 3,
        purchasing: false
    }


    componentDidMount() {
        this.props.onInitIngridients();
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    updatePurchasable = (ings) => {
        const sum = Object.keys( ings )
            .map( igKey => {
                return ings[igKey];
            })
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    purchaseCancelHandler  = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.history.push({ pathname: '/checkout' });
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;

        let burger = null;

        burger = !this.props.error ? <Spinner /> : <p> Error has occured while loading ingredients... </p>;

        if(this.props.ings) {
            burger = (<>
                <Burger ingredients={this.props.ings} />
                <BuildControls
                    price={this.props.totalPrice}
                    disabled={disabledInfo}
                    ingredientAdded = {this.props.onIngredientAdded}
                    ingredientRemoved = {this.props.onIngredientRemoved}
                    ordered={this.purchaseHandler}
                    purchasable={this.updatePurchasable(this.props.ings)}
                />
            </>);
            orderSummary = 
            (<OrderSummary
                price={this.props.totalPrice} 
                ingredients={this.props.ings}
                puchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
            />);
        }

        return(
            <>
                    <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                        {orderSummary}
                    </Modal>
                    {burger}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngridients: () => dispatch(burgerBuilderActions.initIngridients())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));