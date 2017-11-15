import {combineReducers} from 'redux';
import auth from './Auth/AuthReducers';
import navigation from './Navigation/NavigationReducer';
import {menu} from './Menu/MenuReducers';

export const rootReducer = combineReducers({
    auth,
    navigation,
    menu
});