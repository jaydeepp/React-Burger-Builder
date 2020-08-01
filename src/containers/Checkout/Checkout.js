import React from 'react';

import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

import classes from './Checkout.css';

const checkout = props => {

    const checkoutContinued = () => {
        props.history.push(props.match.path + "/contact-data")
    }

    const checkoutCancelled = () => {
        props.history.goBack();
    }


        let summary = <Redirect to="/" />

        if (props.ingredients) {
            const purchasedRedirect = props.purchased? <Redirect to="/" />:null;
            summary = (
            <div className={classes.Checkout}>
                {purchasedRedirect}
                <CheckoutSummary ingredients={props.ingredients} checkoutCancelled={checkoutCancelled} checkoutContinued={checkoutContinued} />
                <Route path={props.match.path + "/contact-data"} component={ContactData} />
            </div>)
        }

        return summary;
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(checkout);