import {combineReducers} from 'redux';
import auth from './Auth/AuthReducers';
import navigation from './Navigation/NavigationReducer';
import {merchant} from './Merchant/MerchantReducers';
import { settings } from './Settings/SettingsReducers';

export const rootReducer = combineReducers({
    auth,
    navigation,
    merchant,
    settings
});