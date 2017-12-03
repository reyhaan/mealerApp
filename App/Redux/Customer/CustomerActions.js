import {takeLatest} from 'redux-saga/effects';
import CustomerSaga from './CustomerSaga';


/******************************* ACTIONS *************************************/
export const customerActions = {
    FETCH_COOKS : 'FETCH_COOKS',
    FETCH_COOKS_SUCCESSFUL: 'FETCH_COOKS_SUCCESSFUL',
    ADD_TO_ORDERS: 'ADD_TO_ORDERS',
    ADD_TO_ORDERS_SUCCESSFUL: 'ADD_TO_ORDERS_SUCCESSFUL'
};

/******************************* ACTION CREATORS *************************************/
function createAction(type, data) {
    return {type, data};
}
export const customerActionCreators = {
    fetchCooks: ()=> createAction(customerActions.FETCH_COOKS),
    fetchCooksSuccessful: (data) => createAction(customerActions.FETCH_COOKS_SUCCESSFUL, data),
    addToOrders: (data) => createAction(customerActions.ADD_TO_ORDERS, data),
    addToOrdersSuccessful: (data) => createAction(customerActions.ADD_TO_ORDERS_SUCCESSFUL, data)
};

/******************************* SAGA WATCHERS *************************************/
export const customerActionWatchers = [
    takeLatest(customerActions.FETCH_COOKS, CustomerSaga.fetchCooks),
    takeLatest(customerActions.ADD_TO_ORDERS, CustomerSaga.addToOrders)
];