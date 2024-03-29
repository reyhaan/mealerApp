import { takeLatest } from 'redux-saga/effects';
import AuthSaga from './AuthSaga';

function createAction(type, data) {
  return { type, data };
}

/** ***************************** ACTIONS ************************************ */
export const authActions = {
  signIn: 'signIn',
  signInSuccessful: 'signInSuccessful',
  signUp: 'signUp',
  signUpSuccessful: 'signUpSuccessful',
  signOut: 'signOut',
  signOutSuccessful: 'signOutSuccessful',
  initializeAppWithCurrentUser: 'initializeAppWithCurrentUser',
  showActivityIndicator: 'showActivityIndicator',
  resetPassword: 'resetPassword',
  showResetPasswordModal: 'showResetPasswordModal',
  setResetPasswordError: 'setResetPasswordError',
};

/** ***************************** ACTION CREATORS ************************************ */
export const authActionCreators = {
  initializeAppWithCurrentUser: () => createAction(authActions.initializeAppWithCurrentUser),
  signIn: data => createAction(authActions.signIn, data),
  signInSuccessful: data => createAction(authActions.signInSuccessful, data),
  signUp: data => createAction(authActions.signUp, data),
  signUpSuccessful: data => createAction(authActions.signUpSuccessful, data),
  signOut: data => createAction(authActions.signOut, data),
  signOutSuccessful: data => createAction(authActions.signOutSuccessful, data),
  showActivityIndicator: data => createAction(authActions.showActivityIndicator, data),
  resetPassword: data => createAction(authActions.resetPassword, data),
  showResetPasswordModal: data => createAction(authActions.showResetPasswordModal, data),
  setResetPasswordError: data => createAction(authActions.setResetPasswordError, data),
};

/** ***************************** ACTION WATCHERS ************************************ */
export const authActionWatchers = [
  takeLatest(authActions.signIn, AuthSaga.signIn),
  takeLatest(authActions.signUp, AuthSaga.signUp),
  takeLatest(authActions.signOut, AuthSaga.signOut),
  takeLatest(authActions.resetPassword, AuthSaga.resetPassword),
  takeLatest(authActions.initializeAppWithCurrentUser, AuthSaga.initializeAppWithCurrentUser),
];
