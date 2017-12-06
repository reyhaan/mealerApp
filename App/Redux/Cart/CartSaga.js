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
        let updatedCart = yield call(cartService.addToCart, item);
        yield put(cartActionCreators.addToCartSuccessful(updatedCart));
    } catch (error) {
        Alert.alert('Error', error.message,)
    } finally {
        yield put(cartActionCreators.hideAddToCartModal(true));
    }
}

cartEffects.removeFromCart = function* (itemId) {

}

cartEffects.updateItemCount = function* (itemId, itemCount) {
    
}

export default cartEffects;