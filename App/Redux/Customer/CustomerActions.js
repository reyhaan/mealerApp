import {takeLatest} from 'redux-saga/effects';
import CustomerSaga from './CustomerSaga';


/******************************* ACTIONS *************************************/
export const customerActions = {
    FETCH_COOKS : 'FETCH_COOKS',
    FETCH_COOKS_SUCCESSFUL: 'FETCH_COOKS_SUCCESSFUL',
    ADD_TO_CART: 'ADD_TO_CART',
    ADD_TO_CART_SUCCESSFUL: 'ADD_TO_CART_SUCCESSFUL'
};

/******************************* ACTION CREATORS *************************************/
function createAction(type, data) {
    return {type, data};
}
export const customerActionCreators = {
    fetchCooks: ()=> createAction(customerActions.FETCH_COOKS),
    fetchCooksSuccessful: (data) => createAction(customerActions.FETCH_COOKS_SUCCESSFUL, data),
    addToCart: (data) => createAction(customerActions.ADD_TO_CART, data),
    addToCartSuccessful: (data) => createAction(customerActions.ADD_TO_CART_SUCCESSFUL, data)
};

/******************************* SAGA WATCHERS *************************************/
export const customerActionWatchers = [
    takeLatest(customerActions.FETCH_COOKS, CustomerSaga.fetchCooks),
    takeLatest(customerActions.ADD_TO_CART, CustomerSaga.addToCart)
];