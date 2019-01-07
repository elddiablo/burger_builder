import React from 'react';
import classes from './Order.css';
import Button from '../../../components/UI/Button/Button';

const Order = (props) => {

    const ingredients = Object.keys(props.ingredients).map(key => (
        <span key={key} className={classes.Ingredient}>{key} : {props.ingredients[key]} </span>
    ));
    

    return(
        <div className={classes.Order}>
            <p>Ingredients: {ingredients} </p>
            <p>Price: <strong>{props.price}</strong></p>
            <Button btnType={'Danger'} clicked={props.deleteOrder}>Delete Order</Button>
        </div>
    );

};


export default Order;