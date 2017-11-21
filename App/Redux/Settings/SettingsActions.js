import {takeLatest} from 'redux-saga/effects';
import settingsEffects from './SettingsEffects';


/******************************* ACTIONS *************************************/
export const settingsActions = {
    UPDATE_USER_INFO: "UPDATE_USER_INFO"
}

/******************************* ACTION CREATORS *************************************/
function createAction(type, data) {
    return {type, data};
}
export const settingsActionCreators = {
    updateUserInfo: (data) => createAction(settingsActions.UPDATE_USER_INFO, data)
};

/******************************* SAGA WATCHERS & EFFECTS *************************************/
export const settingsSagas = [
    takeLatest(settingsActions.UPDATE_USER_INFO, settingsEffects.updateUserInfo)
];