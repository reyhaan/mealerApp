import {all} from 'redux-saga/effects';
import {vendorActionWatchers} from './Vendor/VendorActions';
import {authActionWatchers} from './Auth/AuthActions';
import {settingsActionWatchers} from './Settings/SettingsActions';
import {cartActionWatchers} from './Cart/CartActions';
import {orderActionWatchers} from './Order/OrderActions';

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