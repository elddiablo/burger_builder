import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility'
  
const initialState = {
    ingredients: null,
    totalPrice: 4,
    loading: false,
    error: false,
    building: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.6
}

const addIngredient = (state, action) => {
    let updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    };
    let updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    let updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
    let updatedIng = {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
    };
    let updatedIngs = updateObject(state.ingredients, updatedIng);
    let updatedSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, updatedSt);
}   

const setIngredients = (state, action) => {
    return updateObject (state, {
        ingredients: action.ingredients,
        totalPrice: 4,
        error: false,
        building: false
    })
}

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, {error: true});
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS:
            return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return fetchIngredientsFailed(state, action);
        default:
            return state;
    }
}

export default reducer;