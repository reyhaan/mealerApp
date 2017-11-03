import {combineReducers} from 'redux';
import user from './User/UserReducers';
import navigation from './Navigation/NavigationReducer';

export const rootReducer = combineReducers({
    user,
    navigation
});