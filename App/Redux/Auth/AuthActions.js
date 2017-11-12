import {takeLatest} from 'redux-saga/effects'
import AuthEffect from './AuthEffects'

function createAction(type, data) {
    return {type, data};
}

/******************************* ACTIONS *************************************/
export const authActions = {
    signIn: 'signIn',
    signInSuccessful: 'signInSuccessful',
    signUp: 'signUp',
    signUpSuccessful: 'signUpSuccessful',
    signOut: 'signOut',
    signOutSuccessful: 'signOutSuccessful',
    showActivityIndicator: 'showActivityIndicator',
};

/******************************* ACTION CREATORS *************************************/
export const authActionCreators = {
    signIn: (data) => createAction(authActions.signIn, data),
    signInSuccessful: (data) => createAction(authActions.signInSuccessful, data),
    signUp: (data) => createAction(authActions.signUp, data),
    signUpSuccessful: (data) => createAction(authActions.signUpSuccessful, data),
    signOut: (data) => createAction(authActions.signOut, data),
    signOutSuccessful: (data) => createAction(authActions.signOutSuccessful, data),
    showActivityIndicator: (data) => createAction(authActions.showActivityIndicator, data)
};

/******************************* SAGA WATCHERS & EFFECTS *************************************/
export const authSagas = [
    takeLatest(authActions.signIn, AuthEffect.signIn),
    takeLatest(authActions.signUp, AuthEffect.signUp),
    takeLatest(authActions.signOut, AuthEffect.signOut),
];
