import {takeLatest} from 'redux-saga/effects';
import SettingsSaga from '../Sagas/SettingsSaga';

/******************************* ACTIONS *************************************/
export const settingsActions = {
    UPDATE_USER_INFO: "UPDATE_USER_INFO",
    SET_CURRENT_USER: "SET_USER",
    GET_CURRENT_USER: "GET_USER",
    CLEAR_CURRENT_USER: "CLEAR_CURRENT_USER"
};

/******************************* ACTION CREATORS *************************************/
function createAction(type, data) {
    return {type, data};
}
export const settingsActionCreators = {
    updateUserInfo: (data) => createAction(settingsActions.UPDATE_USER_INFO, data),
    setUser:  (data) => createAction(settingsActions.SET_CURRENT_USER, data),
    getUser: (id) => createAction(settingsActions.GET_CURRENT_USER, {id}),
    clearCurrentUser: () => createAction(settingsActions.CLEAR_CURRENT_USER)
};

/******************************* ACTION WATCHERS *************************************/
export const settingsActionWatchers = [
    takeLatest(settingsActions.UPDATE_USER_INFO, SettingsSaga.updateUserInfo),
    takeLatest(settingsActions.GET_CURRENT_USER, SettingsSaga.getUser),
];