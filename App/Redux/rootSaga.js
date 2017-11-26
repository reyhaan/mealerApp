import {all} from 'redux-saga/effects';
import {merchantActionWatchers} from './Merchant/MerchantActions';
import {authActionWatchers} from './Auth/AuthActions';
import {settingsActionWatchers} from './Settings/SettingsActions';
import {customerActionWatchers} from './Customer/CustomerActions';

const sagas = function* root() {
    yield all([
        ...authActionWatchers,
        ...merchantActionWatchers,
        ...settingsActionWatchers,
        ...customerActionWatchers
    ])
};

export default sagas