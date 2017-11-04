import {takeLatest} from 'redux-saga/effects'
import {signInEffect, signUpEffect} from './AuthSagas'

function action(type, data) {
    return {type, data};
}

// All authentication actions
export const authAction = {
    signIn: 'signIn',
    signInSuccessful: 'signInSuccessful',
    signUp: 'signUp',
    signUpSuccessful: 'signUpSuccessful',
};

/******************************* ACTIONS *************************************/
export const signIn = (data) => action(authAction.signIn, data);
export const signInSuccessful = (data) => action(authAction.signInSuccessful, data);
export const signUp = (data) => action(authAction.signUp, data);
export const signUpSuccessful = (data) => action(authAction.signUpSuccessful, data);

/******************************* WATCHERS *************************************/
export const authSagas = [
    takeLatest(authAction.signIn, signInEffect),
    takeLatest(authAction.signUp, signUpEffect),
];