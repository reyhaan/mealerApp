import {put, call} from 'redux-saga/effects'
import {Alert} from 'react-native';
import orderService from '../../Services/order-service';
import customerOrderService from '../../Services/customer-order-service';
import authentication from '../../Services/authentication-service';
import {orderActionCreators} from './OrderActions'

const orderEffects = {};

orderEffects.getOrders = function* (data) {
    try {
        let userId = data.data;
        // let orders = yield call(customerOrderService.getOrders, userId);
        let orders = yield call(orderService.getCustomerOrders, userId);
        yield put(orderActionCreators.getOrdersSuccessful(orders));
    } catch (error) {
        Alert.alert('Error', error.message,)
    }
};

export default orderEffects;