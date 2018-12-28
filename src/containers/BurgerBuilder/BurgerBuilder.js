import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';


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
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0
            },
            totalPrice: 3,
            purchasing: false,
            purchasable: false
        }
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
        alert('You continued purchasing!!!');
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return(
            <>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                        <OrderSummary
                            price={this.state.totalPrice} 
                            ingredients={this.state.ingredients}
                            puchaseCanceled={this.purchaseCancelHandler}
                            purchaseContinued={this.purchaseContinueHandler}
                        />
                    </Modal>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        price={this.state.totalPrice}
                        disabled={disabledInfo}
                        ingredientAdded = {this.addIngredientHandler}
                        ingredientRemoved = {this.removeIngridientHandler}
                        ordered={this.purchaseHandler}
                        purchasable={this.state.purchasable}
                />
            </>
        );
    }
}


export default BurgerBuilder;