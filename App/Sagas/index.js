import {all} from 'redux-saga/effects';
import {vendorActionWatchers} from '../Actions/VendorActions';
import {authActionWatchers} from '../Actions/AuthActions';
import {settingsActionWatchers} from '../Actions/SettingsActions';
import {cartActionWatchers} from '../Actions/CartActions';
import {orderActionWatchers} from '../Actions/OrderActions';

const sagas = function* root() {
    yield all([
        ...authActionWatchers,
        ...vendorActionWatchers,
        ...settingsActionWatchers,
        ...cartActionWatchers,
        ...orderActionWatchers
    ])
};

export default sagas