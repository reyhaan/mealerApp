import { put, call } from 'redux-saga/effects';
import { Alert } from 'react-native';
import _ from 'lodash';
import { NavigationActions } from 'react-navigation';
import menuService from '../../Services/menu-service';
import vendorService from '../../Services/vendor-service';
import orderService from '../../Services/order-service';
import authentication from '../../Services/authentication-service';
import imgService from '../../Services/image-service';
import Constants from '../../Services/constants-service';
import { vendorActionCreators } from './VendorActions';
import { requestActionCreators } from '../Request/RequestActions';

export default class VendorSaga {
  * fetchVendorMenu() {
    try {
      yield put(requestActionCreators.showLoadingSpinner(true));
      const user = yield call(authentication.currentUser);
      const menus = yield call(menuService.getMenu, user.uid);
      yield put(vendorActionCreators.fetchMenuSuccessful(menus));
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      yield put(requestActionCreators.showLoadingSpinner(false));
    }
  }

  * fetchVendors() {
    try {
      const vendors = yield call(vendorService.fetchVendors);
      yield put(requestActionCreators.showLoadingSpinner(true));
      yield put(vendorActionCreators.updateVendors(vendors));
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      yield put(requestActionCreators.showLoadingSpinner(false));
    }
  }

  * getSelectedVendor(action) {
    try {
      yield put(requestActionCreators.showLoadingSpinner(true));
      const vendor = action.data;
      vendor.menus = yield call(menuService.getMenu, vendor.uid);
      yield put(vendorActionCreators.setSelectedVendor(vendor));
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      yield put(requestActionCreators.showLoadingSpinner(false));
    }
  }

  * createMenu(menu) {
    try {
      yield put(requestActionCreators.showLoadingSpinner(true));
      const user = yield call(authentication.currentUser);
      const { data } = menu;
      if (data.base64img) {
        const imageUrlName = data.itemName + user.uid;
        data.itemImage = yield call(imgService.uploadBase64Image, imageUrlName, data.base64img);
      }
      delete data.base64img; // !important
      yield call(menuService.createMenu, user.uid, data);
      yield put(vendorActionCreators.fetchVendorMenu(user.uid));
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      yield put(requestActionCreators.showLoadingSpinner(false));
    }
  }

  * updateMenu(menu) {
    try {
      yield put(requestActionCreators.showLoadingSpinner(true));
      const { data } = menu;
      const user = yield call(authentication.currentUser);
      if (data.base64img) {
        const imageUrlName = data.itemName + user.uid;
        data.itemImage = yield call(imgService.uploadBase64Image, imageUrlName, data.base64img);
      }
      delete data.base64img; // !important
      yield call(menuService.updateMenu, user.uid, menu.data);
      yield put(vendorActionCreators.fetchVendorMenu(user.uid));
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      yield put(requestActionCreators.showLoadingSpinner(false));
    }
  }

  * removeMenu(menu) {
    try {
      yield put(requestActionCreators.showLoadingSpinner(true));
      const user = yield call(authentication.currentUser);
      yield call(menuService.removeMenu, user.uid, menu.data.id);
      yield put(vendorActionCreators.fetchVendorMenu(user.uid));
      yield put(NavigationActions.back());
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      yield put(requestActionCreators.showLoadingSpinner(false));
    }
  }

  * updateRating(ratingData) {
    try {
      yield put(requestActionCreators.showLoadingSpinner(true));
      const { data } = ratingData;
      const { merchantId, rating } = data;
      yield call(vendorService.updateRating, merchantId, rating);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      yield put(requestActionCreators.showLoadingSpinner(false));
    }
  }

  * fetchVendorOrders() {
    try {
      const user = yield call(authentication.currentUser);
      yield put(requestActionCreators.showLoadingSpinner(true));
      const orders = yield call(orderService.getMerchantOrders, user.uid);
      const newOrders = _.filter(orders, o => o.status === Constants.orderStates.new);
      const acceptedOrders = _.filter(orders, o => o.status === Constants.orderStates.accepted);
      const deliveredOrders = _.filter(orders, o => o.status === Constants.orderStates.delivered);
      const rejectedOrders = _.filter(orders, o => o.status === Constants.orderStates.rejected);
      yield put(vendorActionCreators.fetchVendorsPending(true));
      yield put(vendorActionCreators.setNewVendorOrders(newOrders));
      yield put(vendorActionCreators.setAcceptedVendorOrders(acceptedOrders));
      yield put(vendorActionCreators.setDeliveredVendorOrders(deliveredOrders));
      yield put(vendorActionCreators.setRejectedVendorOrders(rejectedOrders));
      yield put(vendorActionCreators.updateMerchantOrders(orders));
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      yield put(vendorActionCreators.fetchVendorsPending(false));
    }
  }
}
