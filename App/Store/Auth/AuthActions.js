import {takeLatest} from 'redux-saga/effects'
import AuthSaga from './AuthSaga'

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
    getCurrentUser: 'getCurrentUser',
    showActivityIndicator: 'showActivityIndicator',
    resetPassword: 'resetPassword',
    showResetPasswordModal: 'showResetPasswordModal',
    setResetPasswordError: 'setResetPasswordError',
};

/******************************* ACTION CREATORS *************************************/
export const authActionCreators = {
    getCurrentUser: () => createAction(authActions.getCurrentUser),
    signIn: (data) => createAction(authActions.signIn, data),
    signInSuccessful: (data) => createAction(authActions.signInSuccessful, data),
    signUp: (data) => createAction(authActions.signUp, data),
    signUpSuccessful: (data) => createAction(authActions.signUpSuccessful, data),
    signOut: (data) => createAction(authActions.signOut, data),
    signOutSuccessful: (data) => createAction(authActions.signOutSuccessful, data),
    showActivityIndicator: (data) => createAction(authActions.showActivityIndicator, data),
    resetPassword: (data) => createAction(authActions.resetPassword, data),
    showResetPasswordModal: (data) => createAction(authActions.showResetPasswordModal, data),
    setResetPasswordError: (data) => createAction(authActions.setResetPasswordError, data)
};

/******************************* ACTION WATCHERS *************************************/

const authSaga = new AuthSaga();
export const authActionWatchers = [
    takeLatest(authActions.signIn, authSaga.signIn),
    takeLatest(authActions.signUp, authSaga.signUp),
    takeLatest(authActions.signOut, authSaga.signOut),
    takeLatest(authActions.resetPassword, authSaga.resetPassword),
    takeLatest(authActions.getCurrentUser, authSaga.getCurrentUser),
];
