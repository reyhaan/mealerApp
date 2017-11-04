import {combineReducers} from 'redux';
import auth from './Auth/AuthReducers';
import navigation from './Navigation/NavigationReducer';

export const rootReducer = combineReducers({
    auth,
    navigation
});