import { put, call } from 'redux-saga/effects'
import { Alert } from 'react-native';
import orderService from '../../Services/order-service';
import cartService from '../../Services/cart-service';
import { cartActionCreators } from './CartActions'

const cartEffects = {};

cartEffects.addToCart = function* (item) {
    try {
        let { data } = item;
        yield call(cartService.addToCart, data);
        yield put(cartActionCreators.getCart());
    } catch (error) {
        Alert.alert('Error', error.message,)
    } finally {
        yield put(cartActionCreators.hideAddToCartModal(true));
    }
};

cartEffects.removeItemFromCart = function* (item) {
    try {
        let { data } = item;
        yield call(cartService.removeItemFromCart, data.itemId, data.merchantId);
        yield put(cartActionCreators.getCart());
    } catch (error) {
        Alert.alert('Error', error.message,)
    }
};

cartEffects.updateItemCount = function* (item) {
    try {
        let { data } = item;
        yield call(cartService.updateItemCount, data.itemId, data.merchantId, data.newCount);
        yield put(cartActionCreators.getCart());
    } catch (error) {
        Alert.alert('Error', error.message,)
    }
};

cartEffects.checkout = function* () {
    try {
        let updatedCart = yield call(orderService.createCustomerOrder);
        yield put(cartActionCreators.updateCart(updatedCart));
        yield put(cartActionCreators.getCart());
    } catch (error) {
        Alert.alert('Error', error.message,)
    }
};

cartEffects.getUserCart = function* () {
    let cart = yield call(cartService.getCart);
    yield put(cartActionCreators.updateCart(cart));
};

export default cartEffects;