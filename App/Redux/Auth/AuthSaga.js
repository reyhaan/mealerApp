import {put, call} from 'redux-saga/effects'
import {NavigationActions} from 'react-navigation';
import {Alert, AsyncStorage} from 'react-native';
import {authActionCreators} from './AuthActions';
import authenticationService from '../../Services/authentication-service'
import db from '../../Config/database'

/******************************* EFFECTS *************************************/
const authEffect = {};

// Authentication effect of signing in
authEffect.signIn = function* (userCredentials) {
    try {
        yield put(authActionCreators.showActivityIndicator(true));
        let user = yield call(authenticationService.signIn, userCredentials.data);
        user = yield call(authenticationService.fetchUser, user.uid);
        AsyncStorage.setItem('userSession', JSON.stringify(user));
        yield put(authActionCreators.signInSuccessful(user));
        yield put(NavigationActions.navigate({routeName: user.type === "merchant" ? 'MerchantTab' : 'CustomerTab'}));

    } catch (error) {
        Alert.alert('Error', error.message);
    } finally {
        yield put(authActionCreators.showActivityIndicator(false));
    }
};

// Authentication effect of signing up
authEffect.signUp = function* (userCredentials) {
    try {
        yield put(authActionCreators.showActivityIndicator(true));
        yield call(authenticationService.signUp, userCredentials.data);
        let user = yield call(authenticationService.signIn, userCredentials.data);
        user = {
            email: userCredentials.data.email,
            uid: user.uid,
            name: userCredentials.data.name,
            type: userCredentials.data.type
        };
        AsyncStorage.setItem('userSession', JSON.stringify(user));
        yield call(authenticationService.addUser, user);
        yield put(authActionCreators.signUpSuccessful(user));
        yield put(NavigationActions.navigate({routeName: user.type === "merchant" ? 'MerchantTab' : 'CustomerTab'}));
    } catch (error) {
        Alert.alert('Error', error.message);
    } finally {
        yield put(authActionCreators.showActivityIndicator(false));
    }
};

// Authentication effect of signing out
authEffect.signOut = function* () {
    try {
        yield put(authActionCreators.showActivityIndicator(true));
        yield call(authenticationService.signOut);
        yield call(AsyncStorage.removeItem, 'userSession');
        yield put(NavigationActions.navigate({routeName: 'LoginScreen'}));
    } catch (error) {
        Alert.alert('Error', error.message);
    } finally {
        yield put(authActionCreators.showActivityIndicator(false));
    }
};

export default authEffect;