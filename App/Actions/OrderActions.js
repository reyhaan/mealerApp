import {takeLatest} from 'redux-saga/effects';
import OrderSaga from '../Sagas/OrderSaga';


/******************************* ACTIONS *************************************/
export const orderActions = {
    GET_ORDERS: 'GET_ORDERS',
    GET_ORDERS_SUCCESSFUL: 'GET_ORDERS_SUCCESSFUL',
    UPDATE_ORDER_STATUS: 'UPDATE_ORDER_STATUS',
    showActivityIndicator: 'showActivityIndicator',
};

/******************************* ACTION CREATORS *************************************/
function createAction(type, data) {
    return {type, data};
}
export const orderActionCreators = {
    getOrders: (data) => createAction(orderActions.GET_ORDERS, data),
    getOrdersSuccessful: (data) => createAction(orderActions.GET_ORDERS_SUCCESSFUL, data),
    updateOrderStatus: (data) => createAction(orderActions.UPDATE_ORDER_STATUS, data),
    showActivityIndicator: (data) => createAction(orderActions.showActivityIndicator, data)
};

/******************************* ACTION WATCHERS *************************************/
export const orderActionWatchers = [
    takeLatest(orderActions.GET_ORDERS, OrderSaga.getOrders),
    takeLatest(orderActions.UPDATE_ORDER_STATUS, OrderSaga.updateOrderStatus)
];