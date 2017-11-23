import {takeLatest} from 'redux-saga/effects';
import SettingsSaga from './SettingsSaga';


/******************************* ACTIONS *************************************/
export const settingsActions = {
    UPDATE_USER_INFO: "UPDATE_USER_INFO"
};

/******************************* ACTION CREATORS *************************************/
function createAction(type, data) {
    return {type, data};
}
export const settingsActionCreators = {
    updateUserInfo: (data) => createAction(settingsActions.UPDATE_USER_INFO, data)
};

/******************************* ACTION WATCHERS *************************************/
export const settingsActionWatchers = [
    takeLatest(settingsActions.UPDATE_USER_INFO, SettingsSaga.updateUserInfo)
];