import {put, call} from 'redux-saga/effects'
import {NavigationActions} from 'react-navigation';
import {Alert} from 'react-native';
import {signInSuccessful, signOutSuccessful, signUpSuccessful} from './AuthRedux';
import authenticationService from '../../Services/authentication-service'
import {AsyncStorage} from 'react-native';

/******************************* EFFECTS *************************************/
const authEffect = {};

// Authentication effect of signing in
authEffect.signIn = function* (userCredentials) {
    try {
        const user = yield call(authenticationService.signIn, userCredentials.data);
        authenticationService.saveUserSession(user);
        yield put(signInSuccessful(user));
        yield put(NavigationActions.navigate({routeName: 'TabsView'}));
    } catch (error) {
        Alert.alert('Error', error.message,)
    } finally {
        // finally
    }
};

// Authentication effect of signing up
authEffect.signUp = function* (userCredentials) {
    try {
        const user = yield call(authenticationService.signUp, userCredentials.data);
        // TODO: Store the user info in session
        yield put(signUpSuccessful(user));
        yield put(NavigationActions.navigate({routeName: 'TabsView'}));
    } catch (error) {
        Alert.alert('Error', error.message,)
    } finally {
        // finally
    }
};

// Authentication effect of signing out
authEffect.signOut = function* () {
    try {
        const signOut = yield call(authenticationService.signOut);
        if (signOut){
            AsyncStorage.setItem('userSession', null);
            yield put(signOutSuccessful);
            NavigationActions.navigate({routeName: 'LoginScreen'})
        }
    } catch (error) {
        Alert.alert('Error', error.message,)
    } finally {
        // finally
    }
};

export default authEffect;