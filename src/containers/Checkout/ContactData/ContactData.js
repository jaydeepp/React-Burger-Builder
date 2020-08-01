import React, {  useState } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import { connect } from 'react-redux';

import * as orderActions from '../../../store/actions/index';

import classes from './ContactData.css'

import withErrorHandler from '../../../hoc/ErrorHandler/ErrorHandler';

import axios from '../../../axios-orders';

import { updateObject, checkValidity } from '../../../shared/utility';

const contactData = props => {

    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            errorMessage: "Please enter a valid name"
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Email'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false,
            errorMessage: "Please enter a valid email"
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            errorMessage: "Please enter a valid street"
        },
        zipcode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'ZIP code'
            },
            value: '',
            validation: {
                required: true,
                minlength: 5,
                maxlength: 5
            },
            valid: false,
            touched: false,
            errorMessage: "Please enter a ZIP code of 5 characters"
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            errorMessage: "Please enter a valid country"
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' }
                ],
            },
            value: 'fastest',
            validation: {},
            valid: true
        }
    });

    const [formIsValid, setFormIsValid] = useState(false);


    const orderHandler = (event) => {
        event.preventDefault();
        const formData = {};

        for (let formInputElementIdentifier in orderForm) {
            formData[formInputElementIdentifier] = orderForm[formInputElementIdentifier].value;
        }

        const order = {
            ingredients: props.ingredients,
            price: props.totalPrice,
            orderData: formData,
            userId: props.userId
        }
        props.onPurchaseBurger(order, props.token);
    }

    const inputChangedHandler = (event, identifier) => {

        const updatedFormElement = updateObject(orderForm[identifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, orderForm[identifier].validation),
            touched: true
        })

        const updatedOrderForm = updateObject(orderForm, {
            [identifier]: updatedFormElement
        })

        let formIsValid = true;
        for (let identifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[identifier].valid && formIsValid;
        }
        setOrderForm(updatedOrderForm);
        setFormIsValid(formIsValid);
    }


    let formElements = [];

    for (let key in orderForm) {
        formElements.push({
            id: key,
            config: orderForm[key]
        })
    }

    let form = (<form onSubmit={orderHandler}>
        {formElements.map((element) => (
            <Input key={element.id} elementType={element.config.elementType} elementConfig={element.config.elementConfig} value={element.config.value} changed={(event) => inputChangedHandler(event, element.id)} invalid={!element.config.valid} shouldValidate={element.config.validation} touched={element.config.touched} errorMessage={element.config.errorMessage} />
        ))}
        <Button btnType="Success" disabled={!formIsValid}>Order</Button>
    </form>);

    if (props.loading) {
        form = <Spinner />
    }

    return (
        <div className={classes.ContactData}>
            <h4>Enter your contact data</h4>
            {form}
        </div>

    );

}

const mapStateToProps = state => {

    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {

    return {
        onPurchaseBurger: (order, token) => dispatch(orderActions.purchaseBurger(order, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(contactData, axios));