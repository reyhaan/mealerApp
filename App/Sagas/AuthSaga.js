import {put, call} from 'redux-saga/effects'
import {NavigationActions} from 'react-navigation';
import {Alert, AsyncStorage} from 'react-native';
import {authActionCreators} from '../Actions/AuthActions';
import {settingsActionCreators} from '../Actions/SettingsActions';
import authenticationService from '../Services/authentication-service'
import {registerForPushNotification} from '../Services/push-notification-service'

export default class AuthSaga {
    // Authentication effect of signing in
    * signIn (userCredentials) {
        try {
            yield put(authActionCreators.showActivityIndicator(true));
            let user = yield call(authenticationService.signIn, userCredentials.data);
            user = yield call(authenticationService.fetchUser, user.uid);
            AsyncStorage.setItem('userSession', JSON.stringify(user));
            yield put(authActionCreators.signInSuccessful(user));
            yield put(settingsActionCreators.setUser(user)); //!important to update the user state
            yield put(NavigationActions.navigate({routeName: user.type === "vendor" ? 'VendorTab' : 'CustomerTab'}));
            yield call(registerForPushNotification);
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            yield put(authActionCreators.showActivityIndicator(false));
        }
    }

    // Authentication effect of signing in
    * getCurrentUser () {
        try {
            let currentUser = yield call(authenticationService.currentUser);

            if (currentUser) {
                // Update the user app state
                yield put(settingsActionCreators.setUser(currentUser));
                yield put(settingsActionCreators.getUser(currentUser.uid));
            } else {
                //clear the user app state
                yield put(settingsActionCreators.clearCurrentUser());
            }

        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            yield put(authActionCreators.showActivityIndicator(false));
        }
    }

    // Authentication effect of signing up
    * signUp (userCredentials) {
        try {
            yield put(authActionCreators.showActivityIndicator(true));
            yield call(authenticationService.signUp, userCredentials.data);
            let user = yield call(authenticationService.signIn, userCredentials.data);
            user = {
                email: userCredentials.data.email,
                uid: user.uid,
                name: userCredentials.data.name,
                type: userCredentials.data.type,
                agreeToTermsAndConditions: userCredentials.data.agreeToTermsAndConditions
            };
            AsyncStorage.setItem('userSession', JSON.stringify(user));
            yield call(authenticationService.addUser, user);
            yield put(authActionCreators.signUpSuccessful(user));
            yield put(settingsActionCreators.setUser(user)); //!important to update the user state
            yield put(NavigationActions.navigate({routeName: user.type === "vendor" ? 'VendorTab' : 'CustomerTab'}));
            yield call(registerForPushNotification);
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            yield put(authActionCreators.showActivityIndicator(false));
        }
    }

    // Authentication effect of signing out
    * signOut () {
        try {
            yield put(authActionCreators.showActivityIndicator(true));
            yield call(authenticationService.signOut);
            yield call(AsyncStorage.removeItem, 'userSession');
            yield put(NavigationActions.navigate({routeName: 'Login'}));
            yield put(settingsActionCreators.clearCurrentUser());
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            yield put(authActionCreators.showActivityIndicator(false));
        }
    }

    * resetPassword (userEmail) {
        try {
            const userFoundResult = yield call(authenticationService.fetchUserByEmail, userEmail.data)
            const isResetPasswordSuccessful = userFoundResult && userFoundResult.userFound
            if (isResetPasswordSuccessful){
                const showResetPasswordModal = false
                yield put(authActionCreators.showResetPasswordModal(showResetPasswordModal))
                // TODO: create a global snackbar component
                // Alert.alert('Success!', 'Your reset password email has been sent');
            }
            else if (userFoundResult.error) {
                yield put(authActionCreators.setResetPasswordError(userFoundResult.error));
            }
        } catch(error) {
            Alert.alert('Error', error.message);
        }
    }
}