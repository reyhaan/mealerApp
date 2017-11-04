import {put, call} from 'redux-saga/effects'
import {NavigationActions} from 'react-navigation';
import {Alert} from 'react-native';
import authenticationService from '../../Services/authentication-service'

/******************************* EFFECTS *************************************/

export const signInEffect = function* signIn(userCredentials) {
    try {
        const user = yield call(authenticationService.signIn, userCredentials.data);
        console.log("sign: "+user);
        // TODO: Store the user info in session
        yield put(NavigationActions.navigate({routeName: 'TabsView'}));
    } catch (error) {
        Alert.alert('Error', error.message,)
    } finally {
        // finally
    }
};

export const signUpEffect = function* signUpFn(userCredentials) {
    try {
        const user = yield call(authenticationService.signUp, userCredentials.data);
        // TODO: Store the user info in session
        yield put(NavigationActions.navigate({routeName: 'TabsView'}));
    } catch (error) {
        Alert.alert('Error', error.message,)
    } finally {
        // finally
    }
};