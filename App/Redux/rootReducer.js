import {combineReducers} from 'redux';
import auth from './Auth/AuthReducers';
import navigation from './Navigation/NavigationReducer';
import {merchant} from './Merchant/MerchantReducers';
import { settings } from './Settings/SettingsReducers';
import { vendors } from './Vendors/VendorsReducers';
import { cart } from './Cart/CartReducers';
import { order } from './Order/OrderReducers';

export const rootReducer = combineReducers({
    auth,
    navigation,
    merchant,
    settings,
    vendors,
    cart,
    order
});