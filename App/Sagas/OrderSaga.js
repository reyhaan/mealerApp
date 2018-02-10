import {put, call} from 'redux-saga/effects'
import {Alert} from 'react-native';
import orderService from '../Services/order-service';
import {orderActionCreators} from '../Actions/OrderActions'
import {vendorActionCreators} from '../Actions/VendorActions'

const orderEffects = {};

orderEffects.getOrders = function* (data) {
    try {
        let userId = data.data;
        let orders = yield call(orderService.getCustomerOrders, userId);
        yield put(orderActionCreators.showActivityIndicator(true));
        yield put(orderActionCreators.getOrdersSuccessful(orders));
    } catch (error) {
        Alert.alert('Error', error.message,)
    } finally {
        yield put(orderActionCreators.showActivityIndicator(false));
    }
};

orderEffects.updateOrderStatus = function* (action) {
    try {
        const order = action.data;
        yield put(orderActionCreators.showActivityIndicator(true));
        yield call(orderService.updateOrderStatus, order);
        yield put(vendorActionCreators.fetchVendorOrders());
    } catch (error) {
        Alert.alert('Error', error.message,)
    } finally {
        yield put(orderActionCreators.showActivityIndicator(false));
    }
};

export default orderEffects;