import React from 'react';
import classes from '../Burger/Burger.css';

import Wrapper from '../hoc/Wrapper';

import BurgerIngredient from '../../components/Burger/BurgerIngridients/BurgerIngredient';

const burger = (props) => {
    let transformedIngredients = 
    Object.keys(props.ingredients).map(ingredient => {
        return [...Array(props.ingredients[ingredient])].map((_, i) => {
             return <BurgerIngredient key={ingredient + i} type={ingredient} />
        });
    })
    .reduce((arr, el) => {
        return arr.concat(el);
    }, []);

    if(transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>;
    }

    return(
       <>   
        <BurgerIngredient type={"bread-top"} />
            {transformedIngredients}
        <BurgerIngredient type={"bread-bottom"} />
       </> 
    );
}

export default Wrapper(burger, classes.Burger);