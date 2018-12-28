import React from 'react';
import classes from '../BuildControls/BuildControls.css';

import BuildControl from '../BuildControls/BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Meat', type: 'meat'}
];

const buildControls = (props) => {

    return(
        <div className={classes.BuildControls}>
        <p>Current Price <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(control => {
                return <BuildControl 
                key={control.label} 
                label={control.type}
                added={() => props.ingredientAdded(control.type)}
                removed={() => props.ingredientRemoved(control.type)}
                disabled={props.disabled[control.type]}
                />
            })}
            <button 
                className={classes.OrderButton} 
                onClick={props.ordered}
                disabled={!props.purchasable}
                >
                    ORDER NOW
            </button>
        </div>
    );
}

export default buildControls;