import {put, call} from 'redux-saga/effects'
import {Alert} from 'react-native';
import customerService from '../../Services/customer-service';
import customerOrderService from '../../Services/customer-order-service';
import authentication from '../../Services/authentication-service';
import {orderActionCreators} from './OrderActions'

const orderEffects = {};

orderEffects.getOrders = function* (userId) {
    try {
        let { data } = userId;
        let orders = yield call(customerOrderService.getOrders, data);
        yield put(orderActionCreators.getOrdersSuccessful(orders));
    } catch (error) {
        Alert.alert('Error', error.message,)
    }
};

export default orderEffects;