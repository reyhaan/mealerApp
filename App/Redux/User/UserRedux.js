import {put, call, takeLatest} from 'redux-saga/effects'
import {NavigationActions} from 'react-navigation';
import {Alert} from 'react-native';
import authenticationService from '../../Services/authentication-service'
import userActions from './UserActions'

function action(type, data) {
    return {type, data};
}

/******************************* ACTIONS *************************************/
export const signIn = (data) => action(userActions.signIn, data);
export const signUp = (data) => action(userActions.signUp, data);

/******************************* EFFECTS *************************************/
const signInFn = function* signIn(userLoginCredentials) {
    try {
        const user = yield call(authenticationService.signIn, userLoginCredentials.data);
        console.log("sign: "+user);
        // TODO: Store the user info in session
        yield put(NavigationActions.navigate({routeName: 'TabsView'}));
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
    takeLatest(userActions.signIn, signInFn),
    takeLatest(userActions.signUp, signUpFn),
];