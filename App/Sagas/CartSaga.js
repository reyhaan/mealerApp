import {put, call} from 'redux-saga/effects'
import {Alert} from 'react-native';
import orderService from '../Services/order-service';
import cartService from '../Services/cart-service';
import {cartActionCreators} from '../Actions/CartActions';
import {requestActionCreators} from '../Actions/RequestActions';

export default class CartSaga {
    * addToCart(item) {
        try {
            let {data} = item;
            yield call(cartService.addToCart, data);
            yield put(cartActionCreators.getCart());
        } catch (error) {
            Alert.alert('Error', error.message,)
        } finally {
            yield put(cartActionCreators.hideAddToCartModal(true));
        }
    }

    * removeItemFromCart(item) {
        try {
            let {data} = item;
            yield call(cartService.removeItemFromCart, data.itemId, data.merchantId);
            yield put(cartActionCreators.getCart());
        } catch (error) {
            Alert.alert('Error', error.message,)
        }
    }

    * updateItemCount(item) {
        try {
            let {data} = item;
            yield call(cartService.updateItemCount, data.itemId, data.merchantId, data.newCount);
            yield put(cartActionCreators.getCart());
        } catch (error) {
            Alert.alert('Error', error.message,)
        }
    }

    * checkout() {
        try {
            yield put(requestActionCreators.showLoadingSpinner(true));
            let updatedCart = yield call(orderService.createCustomerOrder);
            yield put(cartActionCreators.updateCart(updatedCart));
            yield put(cartActionCreators.getCart());
        } catch (error) {
            Alert.alert('Error', error.message,)
        } finally {
            yield put(requestActionCreators.showLoadingSpinner(false));
        }
    }

    * getUserCart() {
        try {
            let cart = yield call(cartService.getCart);
            yield put(cartActionCreators.updateCart(cart));
        } catch (error) {
            Alert.alert('Error', error.message,)
        }
    }
}