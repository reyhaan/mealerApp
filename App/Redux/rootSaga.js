import {all} from 'redux-saga/effects';
import {merchantActionWatchers} from './Merchant/MerchantActions';
import {authActionWatchers} from './Auth/AuthActions';
import {settingsActionWatchers} from './Settings/SettingsActions';

const sagas = function* root() {
    yield all([
        ...authActionWatchers,
        ...merchantActionWatchers,
        ...settingsActionWatchers
    ])
};

export default sagas