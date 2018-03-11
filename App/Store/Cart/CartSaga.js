import { put, call } from 'redux-saga/effects';
import { Alert } from 'react-native';
import orderService from '../../Services/order-service';
import cartService from '../../Services/cart-service';
import { cartActionCreators } from './CartActions';
import { requestActionCreators } from '../Request/RequestActions';
import { store } from '../../../App';

class CartSaga {
  * addToCart(item) {
    try {
      const { data } = item;
      yield call(cartService.addToCart, data);
      yield put(cartActionCreators.getCart());
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      yield put(cartActionCreators.hideAddToCartModal(true));
    }
  }

  * removeItemFromCart(item) {
    try {
      const { data } = item;
      yield call(cartService.removeItemFromCart, data.itemId, data.merchantId);
      yield put(cartActionCreators.getCart());
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  }

  * updateItemCount(item) {
    try {
      const { data } = item;
      yield call(cartService.updateItemCount, data.itemId, data.merchantId, data.newCount);
      yield put(cartActionCreators.getCart());
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  }

  * checkout() {
    try {
      yield put(requestActionCreators.showLoadingSpinner(true));
      const updatedCart = yield call(orderService.createCustomerOrder);
      yield put(cartActionCreators.updateCart(updatedCart));
      yield put(cartActionCreators.getCart());
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      yield put(requestActionCreators.showLoadingSpinner(false));
    }
  }

  * getUserCart() {
    try {
      const cart = yield call(cartService.getCart);
      yield put(cartActionCreators.updateCart(cart));
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  }

  * setOrderDeliveryType(action) {
    const { data } = action;
    try {
      const cart = Object.assign([], store.getState().cart);
      const vendor = cart.vendors.find(v => v.key === data.vendorId);
      vendor.delivery = data.delivery;
      vendor.items.forEach((item) => {
        item.delivery = data.delivery;
      });
      yield call(cartService.updateDeliveryType, data.vendorId, data.delivery);
      yield put(cartActionCreators.updateCart(cart));
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  }
}

export default new CartSaga();
