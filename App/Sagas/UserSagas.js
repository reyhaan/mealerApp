import * as userActions from '../Redux/User/UserActions';
import {takeLatest} from 'redux-saga/effects'

/******************************* EFFECTS *************************************/
const signInFn = function*  signIn() {
    try {
        console.log("saga works")
    } catch (error) {
        console.log(error)
    } finally {
        // finally
    }
};

/******************************* WATCHERS *************************************/
export const userSagas = [
    takeLatest(userActions.SIGN_IN, signInFn),
];