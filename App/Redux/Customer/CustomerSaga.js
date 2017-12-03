import {put, call} from 'redux-saga/effects'
import {Alert} from 'react-native';
import customerService from '../../Services/customer-service';
import orderService from '../../Services/order-service';
import authentication from '../../Services/authentication-service';
import {customerActionCreators} from './CustomerActions'

const customerEffects = {};

customerEffects.fetchCooks = function* () {
    try {
        const cooks = yield call(customerService.fetchCooks);
        yield put(customerActionCreators.fetchCooksSuccessful(cooks));
    } catch (error) {
        Alert.alert('Error', error.message,)
    }
};

customerEffects.addToOrders = function* (order) {
    try {
        const order = {
            from: order.data.from,
            to: order.data.to,
            items:order.items
        };

        const _order = yield call(orderService.createNewOrder, order.data);
        yield put(customerActionCreators.addToCartSuccessful(_order));
    } catch (error) {
        Alert.alert('Error', error.message,)
    }
};

export default customerEffects;