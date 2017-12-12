import {put, call} from 'redux-saga/effects'
import {Alert} from 'react-native';
import customerService from '../../Services/customer-service';
import orderService from '../../Services/order-service';
import authentication from '../../Services/authentication-service';
import {orderActionCreators} from './OrderActions'

const orderEffects = {};

orderEffects.getOrders = function* (order) {
    try {

    } catch (error) {
        Alert.alert('Error', error.message,)
    }
};

export default orderEffects;