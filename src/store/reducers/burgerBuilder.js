import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../shared/utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}

const INGREDIENT_PRICES = {
    salad: 0.4,
    cheese: 0.5,
    bacon: 1.3,
    meat: 1.6
}

const ingredientAdded = (state, action) => {
    const updateIngredients = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    }
    const updatedIngredients = updateObject(state.ingredients, updateIngredients)
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedState);

}

const ingredientRemoved = (state, action) => {
    const updatedIngs = updateObject(state.ingredients, {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
    })
    const updatestate = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatestate);
}


const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false,
        building: false
    })
}

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, { error: true })
}
const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.INGREDIENT_ADDED: return ingredientAdded(state, action)
        case actionTypes.INGREDIENT_REMOVED: return ingredientRemoved(state, action)
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action)
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action)
        default: return state;
    }
}

export default reducer;