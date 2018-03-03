import { put, call } from 'redux-saga/effects';
import { Alert } from 'react-native';
import orderService from '../../Services/order-service';
import { orderActionCreators } from './OrderActions';
import { vendorActionCreators } from '../Vendor/VendorActions';

class OrderSaga {
  * getOrders(data) {
    try {
      const userId = data.data;
      const orders = yield call(orderService.getCustomerOrders, userId);
      yield put(vendorActionCreators.fetchVendorsOrdersPending(true));
      yield put(orderActionCreators.getOrdersSuccessful(orders));
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      yield put(vendorActionCreators.fetchVendorsOrdersPending(false));
    }
  }

  * updateOrderStatus(action) {
    try {
      const order = action.data;
      yield put(vendorActionCreators.fetchVendorsOrdersPending(true));
      yield put(orderActionCreators.showActivityIndicator(true));
      yield call(orderService.updateOrderStatus, order);
      yield put(vendorActionCreators.fetchVendorOrders());
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      yield put(vendorActionCreators.fetchVendorsOrdersPending(false));
      yield put(orderActionCreators.showActivityIndicator(false));
    }
  }
}

export default new OrderSaga();
