import React from 'react';
import classes from './Order.css';
import Button from '../../../components/UI/Button/Button';

const Order = (props) => {

    let ingredients = null;
    ingredients = Object.keys(props.ingredients).map(key => (
        key + " : " + props.ingredients[key]
    )).join(", ");
    

    return(
        <div className={classes.Order}>
            <p>Ingredients: <i>{ingredients}</i></p>
            <p>Price: <strong>{props.price}</strong></p>
            <Button btnType={'Danger'} clicked={props.deleteOrder}>Delete Order</Button>
        </div>
    );

};


export default Order;