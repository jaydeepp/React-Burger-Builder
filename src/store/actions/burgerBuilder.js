import * as actionTypes from './actionTypes'

export const ingredientAdded = (name) => {

    return { type: actionTypes.INGREDIENT_ADDED, ingredientName: name }
}

export const ingredientRemoved = (name) => {

    return { type: actionTypes.INGREDIENT_REMOVED, ingredientName: name }
}

export const setIngredients = (ingredients) => {

    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }

}

export const initIngredients = () => {

    return {
        type: actionTypes.INGREDIENT_INIT
    }
}

export const fetchIngredientsFailed = ()=>{
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}
