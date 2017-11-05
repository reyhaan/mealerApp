import {takeLatest} from 'redux-saga/effects'
import AuthEffect from './AuthEffects'

function action(type, data) {
    return {type, data};
}

// All authentication actions
export const authAction = {
    signIn: 'signIn',
    signInSuccessful: 'signInSuccessful',
    signUp: 'signUp',
    signUpSuccessful: 'signUpSuccessful',
    signOut: 'signOut',
    signOutSuccessful: 'signOutSuccessful',
};

/******************************* ACTIONS *************************************/
export const signIn = (data) => action(authAction.signIn, data);
export const signInSuccessful = (data) => action(authAction.signInSuccessful, data);
export const signUp = (data) => action(authAction.signUp, data);
export const signUpSuccessful = (data) => action(authAction.signUpSuccessful, data);
export const signOut = (data) => action(authAction.signOut, data);
export const signOutSuccessful = (data) => action(authAction.signOutSuccessful, data);

/******************************* WATCHERS *************************************/
export const authSagas = [
    takeLatest(authAction.signIn, AuthEffect.signIn),
    takeLatest(authAction.signUp, AuthEffect.signUp),
    takeLatest(authAction.signOut, AuthEffect.signOut),
];