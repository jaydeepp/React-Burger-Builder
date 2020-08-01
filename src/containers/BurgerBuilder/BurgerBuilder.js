
import React, { useState, useEffect,useCallback } from "react";

import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

import Modal from '../../components/UI/Modal/Modal'

import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

import Spinner from '../../components/UI/Spinner/Spinner'

import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler'

import axios from '../../axios-orders';
import { useDispatch, useSelector } from 'react-redux';

import * as actions from '../../store/actions/index';

const burgerBuilder = props => {

    const dispatch = useDispatch();

    const onIngredientAdded = (ingredientName) => dispatch(actions.ingredientAdded(ingredientName));
    const onIngredientRemoved = (ingredientName) => dispatch(actions.ingredientRemoved(ingredientName));
    const onInitIngredients =useCallback( () => dispatch(actions.initIngredients()),[]);
    const onPurchaseInit = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

    const ingredients = useSelector((state)=>state.burgerBuilder.ingredients);
    const totalPrice = useSelector((state)=>state.burgerBuilder.totalPrice);
    const error = useSelector((state)=>state.burgerBuilder.error);
    const isAuthenticated = useSelector((state)=>state.auth.token !== null);

    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients])



    const isPurchasable = () => {

        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        })
            .reduce((total, el) => {
                return total + el
            }, 0)

        return sum > 0;
    }

    const setPurchasingState = () => {
        if (isAuthenticated) {
            setPurchasing(true);
        }
        else {
            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }


    const purchaseCancelHandler = () => {

        setPurchasing(false);
    }

    const purchaseSubmitHandler = () => {
        onPurchaseInit();
        props.history.push("/checkout");

    }


    const disabledInfo = { ...ingredients };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null
    let burgerBuilder = error ? <p>Ingredients not available</p> : <Spinner />

    if (ingredients) {
        burgerBuilder = (
            <Aux>
                <Burger ingredients={ingredients} />
                <BuildControls
                    ingredientAdded={onIngredientAdded}
                    ingredientRemoved={onIngredientRemoved}
                    disabledInfo={disabledInfo} price={totalPrice}
                    purchasable={isPurchasable()}
                    ordered={setPurchasingState}
                    isAuth={isAuthenticated} />
            </Aux>
        );

        orderSummary = (<OrderSummary ingredients={ingredients} submit={purchaseSubmitHandler} cancel={purchaseCancelHandler} price={totalPrice} />)
    }
    return (
        <Aux>
            <Modal show={purchasing} closed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burgerBuilder}
        </Aux>
    )

}




export default ErrorHandler(burgerBuilder, axios);