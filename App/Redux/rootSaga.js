import {all} from 'redux-saga/effects';
import {menuSagas} from './Menu/MenuActions';
import {authSagas} from './Auth/AuthActions';
import {settingsSagas} from './Settings/SettingsActions';

const sagas = function* root() {
    yield all([
        ...authSagas,
        ...menuSagas,
        ...settingsSagas
    ])
};

export default sagas