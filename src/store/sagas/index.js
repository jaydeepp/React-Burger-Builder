import { takeEvery } from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";
import { logoutSaga, checkAuthTimeoutSaga, authRequestSaga, checkAuthStateSaga } from './auth';
import { initIngredientsSaga } from "./burgerBuilder";
import { purchaseBurgerSaga,fetchOrdersRequestSaga } from "./order";

export function* watchAuth() {

    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
    yield takeEvery(actionTypes.AUTH_REQUEST, authRequestSaga);
    yield takeEvery(actionTypes.CHECK_AUTH_STATE, checkAuthStateSaga);
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INGREDIENT_INIT, initIngredientsSaga);
}

export function* watchOrders() {
    yield takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS_REQUEST, fetchOrdersRequestSaga);
}