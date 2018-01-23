import {combineReducers} from 'redux';
import auth from './Auth/AuthReducers';
import navigation from './Navigation/NavigationReducer';
import request from './Request/RequestReducers';
import { settings } from './Settings/SettingsReducers';
import { vendor } from './Vendor/VendorReducers';
import { cart } from './Cart/CartReducers';
import { order } from './Order/OrderReducers';

export const rootReducer = combineReducers({
    auth,
    navigation,
    settings,
    vendor,
    cart,
    order,
    request
});