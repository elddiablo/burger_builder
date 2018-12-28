import React, {Component} from 'react';
import Button from '../../UI/Button/Button';

class orderSummary extends Component {

    componentWillUpdate() {
        console.log('[order summary Will Update]');
    }    

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(key => {
            return <li key={key}><span style={{textTransform: 'capitalize'}}>{key}</span> : {this.props.ingredients[key]}</li>
        });
        return (
            <>
                <h3>
                    Your Order:
                </h3>
                <p>
                    A burger with the following Ingredient
                </p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>
                    <strong>Total Price</strong>:{this.props.price.toFixed(2)}
                </p>
                <p>
                    Continue to Checkout?
                </p>
                <Button btnType={"Danger"} clicked={this.props.puchaseCanceled}>Cancel</Button>
                <Button btnType={"Success"} clicked={this.props.purchaseContinued}>Continue</Button>
            </>
        )
    } 
}

export default orderSummary;