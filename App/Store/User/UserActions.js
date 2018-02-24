import { takeLatest } from 'redux-saga/effects';
import UserSaga from './UserSaga';

/** ***************************** ACTIONS ************************************ */
export const userActions = {
  UPDATE_USER_INFO: 'UPDATE_USER_INFO',
  SET_CURRENT_USER: 'SET_USER',
  GET_CURRENT_USER: 'GET_USER',
  CLEAR_CURRENT_USER: 'CLEAR_CURRENT_USER',
  REGISTER_FOR_PUSH_NOTIFICATION: 'REGISTER_FOR_PUSH_NOTIFICATION',
};

/** ***************************** ACTION CREATORS ************************************ */
function createAction(type, data) {
  return { type, data };
}
export const userActionCreators = {
  updateUserInfo: data => createAction(userActions.UPDATE_USER_INFO, data),
  setUser: data => createAction(userActions.SET_CURRENT_USER, data),
  getUser: () => createAction(userActions.GET_CURRENT_USER),
  clearCurrentUser: () => createAction(userActions.CLEAR_CURRENT_USER),
  registerForPushNotification: data => createAction(userActions.REGISTER_FOR_PUSH_NOTIFICATION, data),
};

/** ***************************** ACTION WATCHERS ************************************ */
const userSaga = new UserSaga();
export const settingsActionWatchers = [
  takeLatest(userActions.SET_CURRENT_USER, userSaga.setCurrentUser),
  takeLatest(userActions.UPDATE_USER_INFO, userSaga.updateUserInfo),
  takeLatest(userActions.GET_CURRENT_USER, userSaga.getUser),
  takeLatest(userActions.REGISTER_FOR_PUSH_NOTIFICATION, userSaga.registerForPushNotification),
];
