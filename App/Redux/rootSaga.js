import {all} from 'redux-saga/effects';
import {merchantActionWatchers} from './Merchant/MerchantActions';
import {authActionWatchers} from './Auth/AuthActions';
import {settingsActionWatchers} from './Settings/SettingsActions';
import {customerActionWatchers} from './Customer/CustomerActions';
import {cartActionWatchers} from './Cart/CartActions';
import {orderActionWatchers} from './Order/OrderActions';

const sagas = function* root() {
    yield all([
        ...authActionWatchers,
        ...merchantActionWatchers,
        ...settingsActionWatchers,
        ...customerActionWatchers,
        ...cartActionWatchers,
        ...orderActionWatchers
    ])
};

export default sagas