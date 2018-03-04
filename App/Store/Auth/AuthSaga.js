import { put, call } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import { Alert, AsyncStorage } from 'react-native';
import { Notifications } from 'expo';
import { store } from '../../../App';
import { authActionCreators } from './AuthActions';
import { userActionCreators } from '../User/UserActions';
import { orderActionCreators } from '../Order/OrderActions';
import { vendorActionCreators } from '../Vendor/VendorActions';
import authenticationService from '../../Services/authentication-service';
import { handleReceivedNotification, clearBadgeCount } from '../../Services/push-notification-service';

class AuthSaga {
  * initializeAppWithCurrentUser() {
    try {
      // yield call(AsyncStorage.clear);

      yield put(authActionCreators.showActivityIndicator(true));

      let currentUser = {};
      currentUser.uid = yield call(authenticationService.currentUser);

      if (currentUser.uid) {
        currentUser = yield call(authenticationService.fetchUser, currentUser.uid);
        yield put(userActionCreators.setUser(currentUser));

        if (currentUser.type === 'customer') {
          yield put(NavigationActions.navigate({ routeName: 'CustomerTab' }));
          yield put(vendorActionCreators.fetchVendors());
          yield put(orderActionCreators.getOrders(currentUser.uid));
        } else if (currentUser.type === 'vendor') {
          yield put(NavigationActions.navigate({ routeName: 'VendorTab' }));
          yield put(vendorActionCreators.fetchVendorMenu());
        }


        yield put(userActionCreators.registerForPushNotification(true));
        yield call(clearBadgeCount);

        Notifications.addListener((notification) => {
          handleReceivedNotification(notification, store.dispatch);
        });
      } else {
        // clear the user app state
        yield call(AsyncStorage.clear);
        yield put(userActionCreators.clearCurrentUser());
        yield put(NavigationActions.navigate({ routeName: 'Login' }));
      }
    } catch (error) {
      yield call(AsyncStorage.clear);
      Alert.alert('Error', error.message);
    } finally {
      yield put(authActionCreators.showActivityIndicator(false));
    }
  }

  // Authentication effect of signing in
  * signIn(userCredentials) {
    try {
      yield put(authActionCreators.showActivityIndicator(true));
      const user = yield call(authenticationService.signIn, userCredentials.data);
      yield call(authenticationService.saveUserToLocalStorage, user.uid);
      yield put(authActionCreators.initializeAppWithCurrentUser());
    } catch (error) {
      yield call(AsyncStorage.clear);
      Alert.alert('Error', error.message);
    } finally {
      yield put(authActionCreators.showActivityIndicator(false));
    }
  }

  // Authentication effect of signing up
  * signUp(userCredentials) {
    try {
      yield put(authActionCreators.showActivityIndicator(true));
      yield call(authenticationService.signUp, userCredentials.data);
      let user = yield call(authenticationService.signIn, userCredentials.data);
      user = {
        email: userCredentials.data.email,
        uid: user.uid,
        name: userCredentials.data.name,
        type: userCredentials.data.type,
        agreeToTermsAndConditions: userCredentials.data.agreeToTermsAndConditions,
      };
      yield call(authenticationService.addUser, user);
      yield call(authenticationService.saveUserToLocalStorage, user.uid);
      yield put(authActionCreators.initializeAppWithCurrentUser());
    } catch (error) {
      yield call(AsyncStorage.clear);
      Alert.alert('Error', error.message);
    } finally {
      yield put(authActionCreators.showActivityIndicator(false));
    }
  }

  // Authentication effect of signing out
  * signOut() {
    try {
      yield call(AsyncStorage.clear);
      yield call(authenticationService.signOut);
      yield put(NavigationActions.navigate({ routeName: 'Login' }));
      yield put(userActionCreators.clearCurrentUser());
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      yield put(authActionCreators.showActivityIndicator(false));
    }
  }

  * resetPassword(userEmail) {
    try {
      const userFoundResult = yield call(authenticationService.fetchUserByEmail, userEmail.data);
      const isResetPasswordSuccessful = userFoundResult && userFoundResult.userFound;
      if (isResetPasswordSuccessful) {
        const showResetPasswordModal = false;
        yield put(authActionCreators.showResetPasswordModal(showResetPasswordModal));
        // TODO: create a global snackbar component
        // Alert.alert('Success!', 'Your reset password email has been sent');
      } else if (userFoundResult.error) {
        yield put(authActionCreators.setResetPasswordError(userFoundResult.error));
      }
    } catch (error) {
      yield call(AsyncStorage.clear);
      Alert.alert('Error', error.message);
    }
  }
}

export default new AuthSaga();
