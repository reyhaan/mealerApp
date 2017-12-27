import { put, call } from 'redux-saga/effects'
import { Alert } from 'react-native';
import orderService from '../../Services/order-service';
import cartService from '../../Services/cart-service';
import { cartActionCreators } from './CartActions'

const cartEffects = {};

cartEffects.addToCart = function* (item) {
    try {
        let { data } = item;
        let updatedCart = yield call(cartService.addToCart, data);
        yield put(cartActionCreators.addToCartSuccessful(updatedCart));
    } catch (error) {
        Alert.alert('Error', error.message,)
    } finally {
        yield put(cartActionCreators.hideAddToCartModal(true));
    }
};

cartEffects.removeItemFromCart = function* (item) {
    try {
        let { data } = item;
        let updatedCart = yield call(cartService.removeItemFromCart, data.itemId, data.merchantId);
        yield put(cartActionCreators.cartUpdateSuccessful(updatedCart));
    } catch (error) {
        Alert.alert('Error', error.message,)
    }
};

cartEffects.updateItemCount = function* (item) {
    try {
        let { data } = item;
        let updatedCart = yield call(cartService.updateItemCount, data.itemId, data.merchantId, data.newCount);
        yield put(cartActionCreators.cartUpdateSuccessful(updatedCart));
    } catch (error) {
        Alert.alert('Error', error.message,)
    }
};

cartEffects.doCheckout = function* () {
    try {
        let updatedCart = yield call(orderService.createNewOrder);
        yield put(cartActionCreators.cartUpdateSuccessful(updatedCart));
    } catch (error) {
        Alert.alert('Error', error.message,)
    }
};

export default cartEffects;