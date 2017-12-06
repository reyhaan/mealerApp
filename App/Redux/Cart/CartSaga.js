import { put, call } from 'redux-saga/effects'
import { Alert, AsyncStorage } from 'react-native';
import customerService from '../../Services/customer-service';
import cartService from '../../Services/cart-service';
import authentication from '../../Services/authentication-service';
import { cartActionCreators } from './CartActions'
import _ from 'lodash'

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
}

cartEffects.removeItemFromCart = function* (item) {
    try {
        let { data } = item;
        let updatedCart = yield call(cartService.removeItemFromCart, data.itemId, data.merchantId);
        yield put(cartActionCreators.cartUpdateSuccessful(updatedCart));
    } catch (error) {
        Alert.alert('Error', error.message,)
    }
}

cartEffects.updateItemCount = function* (itemId, itemCount) {
    try {
        let { data } = item;
        let updatedCart = yield call(cartService.updateItemCount, data.itemId, data.merchantId, data.newCount);
        yield put(cartActionCreators.cartUpdateSuccessful(updatedCart));
    } catch (error) {
        Alert.alert('Error', error.message,)
    }
}

export default cartEffects;