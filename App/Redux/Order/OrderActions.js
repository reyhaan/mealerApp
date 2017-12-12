import {takeLatest} from 'redux-saga/effects';
import OrderSaga from './OrderSaga';


/******************************* ACTIONS *************************************/
export const orderActions = {
    GET_ORDERS: 'GET_ORDERS',
    GET_ORDERS_SUCCESSFUL: 'GET_ORDERS_SUCCESSFUL'
};

/******************************* ACTION CREATORS *************************************/
function createAction(type, data) {
    return {type, data};
}
export const orderActionCreators = {
    getOrders: (data) => createAction(orderActions.GET_ORDERS, data),
    getOrdersSuccessful: (data) => createAction(orderActions.GET_ORDERS_SUCCESSFUL, data)
};

/******************************* SAGA WATCHERS *************************************/
export const orderActionWatchers = [
    takeLatest(orderActions.GET_ORDERS, OrderSaga.getOrders)
];