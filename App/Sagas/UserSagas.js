import * as userActions from '../Redux/User/UserActions';
import {put, call, takeLatest} from 'redux-saga/effects'
import {NavigationActions} from 'react-navigation';
import {Alert} from 'react-native';
import authenticationService from '../Services/authentication-service'

/******************************* EFFECTS *************************************/
const signInFn = function* signIn() {
    try {
        console.log("sign in user")
    } catch (error) {
        Alert.alert('Error', error.message,)
    } finally {
        // finally
    }
};

const signUpFn = function* signUp(userCredentials) {
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

/******************************* WATCHERS *************************************/
export const userSagas = [
    takeLatest(userActions.SIGN_IN, signInFn),
    takeLatest(userActions.SIGN_UP, signUpFn),
];