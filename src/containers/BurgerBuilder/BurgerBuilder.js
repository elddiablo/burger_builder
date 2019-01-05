import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';

import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandler';

import Spinner from '../../components/UI/Spinner/Spinner';

import {Link} from 'react-router-dom';
import axios from '../../axios.orders';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.6
}

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: null,
            totalPrice: 3,
            purchasing: false,
            purchasable: false,
            loading: false,
            error: false
        }
    }


    componentDidMount() {

        console.log(this.props);

        axios.get('/ingredients.json')
            .then(res => {
                this.setState({ingredients: res.data});
            }).catch(err => {
                this.setState({error: true});
                console.log(err.message);
            });
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    updatePurchasable = () => {
        const our_ingredients = {...this.state.ingredients};
        const ingredients_quantity = Object.keys(our_ingredients)
            .map(key => {
                return our_ingredients[key];
            });
        console.log(ingredients_quantity);
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;
        const newIngredients = {
            ...this.state.ingredients
        }

        newIngredients[type] = newCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            ingredients: newIngredients,
            totalPrice: newPrice,
            purchasable: true
        });
    }

    removeIngridientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount - 1;
        const newIngredients = {
            ...this.state.ingredients
        }

        newIngredients[type] = newCount;

        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        if(oldPrice <= 0){
            return
        } else {
            const newPrice = oldPrice - priceDeduction;
            
            this.setState({
                ingredients: newIngredients,
                totalPrice: newPrice
            });
        }
        
    }

    purchaseCancelHandler  = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // this.setState({loading: true});

        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Nikita Parovyi',
        //         address: {
        //             street: 'Rostovskaya',
        //             zipCode: '3009',
        //             country: 'Ukraine'
        //         },
        //         email: 'test@test.com'
        //     },
        //     deliveryMetyhod: 'Fastest'
        // }

        // axios.post('/orders.json', order)
        //     .then(res => {
        //         console.log(res);
        //         this.setState({loading: false, purchasing: false});
        //     }).catch(err => {
        //         console.log(err)
        //         this.setState({loading: false, purchasing: false});
        //     });
        const queryParams = [];

        for(let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }

        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;

        let burger = null;

        burger = !this.state.error ? <Spinner /> : <p> Error has occured while loading ingredients... </p>;

        if(this.state.ingredients) {
            burger = (<>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    price={this.state.totalPrice}
                    disabled={disabledInfo}
                    ingredientAdded = {this.addIngredientHandler}
                    ingredientRemoved = {this.removeIngridientHandler}
                    ordered={this.purchaseHandler}
                    purchasable={this.state.purchasable}
                />
            </>);
            orderSummary = 
            (<OrderSummary
                price={this.state.totalPrice} 
                ingredients={this.state.ingredients}
                puchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
            />);
        }
        if(this.state.loading) {
            orderSummary = <Spinner />;
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


export default withErrorHandler(BurgerBuilder, axios);