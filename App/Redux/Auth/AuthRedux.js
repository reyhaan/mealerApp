import {takeLatest} from 'redux-saga/effects'
import {signInEffect, signUpEffect} from './AuthSagas'

function action(type, data) {
    return {type, data};
}

// All authentication actions
export const authAction = {
    signIn: 'SIGN_IN',
    signUp: 'SIGN_UP'
};

/******************************* ACTIONS *************************************/
export const signIn = (data) => action(authAction.signIn, data);
export const signUp = (data) => action(authAction.signUp, data);


/******************************* WATCHERS *************************************/
export const authSagas = [
    takeLatest(authAction.signIn, signInEffect),
    takeLatest(authAction.signUp, signUpEffect),
];