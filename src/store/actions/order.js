
import * as actionTypes from '../actions/actionTypes';

export const purchaseBurger = (order,token) => {

    return {
        type: actionTypes.PURCHASE_BURGER,
        order: order,
        token: token
    }
}

export const purchaseBurgerSuccess = (id, orderData) => {

    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {

    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}


export const purchaseBurgerInit = ()=>{
    return {
        type: actionTypes.PURCHASE_BURGER_INIT
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}


export const fetchOrdersSuccess = (orders) => {

    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrdersInit = () => {
    return {
        type: actionTypes.FETCH_ORDERS_INIT
    }
}

export const fetchOrders = (token, userId) => {
    return {
        type: actionTypes.FETCH_ORDERS_REQUEST,
        token: token,
        userId: userId
    }
}