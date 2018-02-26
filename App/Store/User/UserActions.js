import { takeLatest } from 'redux-saga/effects';
import UserSaga from './UserSaga';

/** ***************************** ACTIONS ************************************ */
export const userActions = {
  UPDATE_USER: 'UPDATE_USER',
  SET_USER: 'SET_USER',
  CLEAR_CURRENT_USER: 'CLEAR_CURRENT_USER',
  REGISTER_FOR_PUSH_NOTIFICATION: 'REGISTER_FOR_PUSH_NOTIFICATION',
};

/** ***************************** ACTION CREATORS ************************************ */
function createAction(type, data) {
  return { type, data };
}
export const userActionCreators = {
  updateUser: data => createAction(userActions.UPDATE_USER, data),
  setUser: data => createAction(userActions.SET_USER, data),
  clearCurrentUser: () => createAction(userActions.CLEAR_CURRENT_USER),
  registerForPushNotification: data => createAction(userActions.REGISTER_FOR_PUSH_NOTIFICATION, data),
};

/** ***************************** ACTION WATCHERS ************************************ */
export const settingsActionWatchers = [
  takeLatest(userActions.SET_USER, UserSaga.setUser),
  takeLatest(userActions.UPDATE_USER, UserSaga.updateUser),
  takeLatest(userActions.REGISTER_FOR_PUSH_NOTIFICATION, UserSaga.registerForPushNotification),
];
