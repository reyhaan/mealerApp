import { Alert } from 'react-native';
import { call, put } from 'redux-saga/effects';
import { userActionCreators } from '../User/UserActions';
import { cartActionCreators } from '../Cart/CartActions';
import { vendorActionCreators } from '../Vendor/VendorActions';
import authenticationService from '../../Services/authentication-service';
import Constants from '../../Constants/Constants';


class NavigationSaga {
  * updateAppState(data) {
    const { routeName } = data;

    let currentUser = yield call(authenticationService.currentUser);

    // Merchant user fetch merchants menu
    if (routeName === 'One' && currentUser.type === Constants.userType.vendor) {
      console.log('fetch the vendors menu');
      try {
        yield call(vendorActionCreators.fetchVendorMenu, currentUser.uid);
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    }

    // Customer user fetch latest vendors
    if (routeName === 'One' && currentUser.type === Constants.userType.customer) {
      console.log('fetch the latest vendors for the customer');
      try {
        yield call(vendorActionCreators.fetchVendors);
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    }

    // Vendor user fetch latest orders
    if (routeName === 'Two' && currentUser.type === Constants.userType.vendor) {
      console.log('fetch the latest vendors orders');
      try {
        yield call(vendorActionCreators.fetchVendorOrders);
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    }

    // Customer user fetch latest orders
    if (routeName === 'Two' && currentUser.type === Constants.userType.customer) {
      console.log('fetch users cart');
      try {
        yield call(cartActionCreators.getCart);
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    }

    // Account tab fetch latest user information
    if (routeName === 'Three') {
      console.log('fetch the user');
      try {
        currentUser = yield call(authenticationService.fetchUser, currentUser.uid);
        yield put(userActionCreators.setUser(currentUser));
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    }
  }
}

export default new NavigationSaga();
