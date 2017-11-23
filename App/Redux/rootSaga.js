import {all} from 'redux-saga/effects';
import {menuActionWatchers} from './Menu/MenuActions';
import {authActionWatchers} from './Auth/AuthActions';
import {settingsActionWatchers} from './Settings/SettingsActions';

const sagas = function* root() {
    yield all([
        ...authActionWatchers,
        ...menuActionWatchers,
        ...settingsActionWatchers
    ])
};

export default sagas