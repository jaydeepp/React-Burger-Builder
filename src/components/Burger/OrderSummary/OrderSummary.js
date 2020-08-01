import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

import Button from '../../UI/Button/Button'

const orderSummary = (props) => {

    const ingredients = Object.keys(props.ingredients).map(igKey => (
        <li key={igKey}><span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}</li>
    ))

    return (
        <Auxiliary>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredients}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Proceed to checkout?</p>
            <Button btnType="Danger" clicked={props.cancel}>Cancel</Button>
            <Button btnType="Success" clicked={props.submit}>Proceed</Button>
        </Auxiliary>
    )
}

export default orderSummary;