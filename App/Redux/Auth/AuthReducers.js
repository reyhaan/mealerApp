import {authAction} from './AuthRedux';

let initialState = {};

export default function auth(state = initialState, action) {
    switch (action.type) {
        case authAction.signInSuccessful:
            return Object.assign({}, state, {
                user: action.data,
            });
        case authAction.signUpSuccessful:
            return Object.assign({}, state, {
                user: action.data,
            });
        case authAction.showActivityIndicator:
            return Object.assign({}, state, {
                showActivityIndicator: action.data,
            });
        default:
            return state;
    }
}