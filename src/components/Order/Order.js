import React from 'react';

import classes from './Order.css'

const order = (props) => {

    const ingredients = [];

    for(let key in props.ingredients){
        ingredients.push({
            name:key,
            value: props.ingredients[key]
        })
    }

    const ingredientstOutput = ingredients.map((ig)=>{
        return <span style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            padding: '5px',
            border: '1px solid #ccc'
        }} key={ig.name}>Ingredients: {ig.name} ({ig.value})</span>
    })

    return (
        <div className={classes.Order}>
            {ingredientstOutput}
            <p>Total Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )
}

export default order;