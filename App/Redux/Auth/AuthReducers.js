import {authActions} from './AuthRedux';

let initialState = {};

export default function auth(state = initialState, action) {
    switch (action.type) {
        case authActions.signInSuccessful:
            return Object.assign({}, state, {
                user: action.data,
            });
        case authActions.signUpSuccessful:
            return Object.assign({}, state, {
                user: action.data,
            });
        case authActions.showActivityIndicator:
            return Object.assign({}, state, {
                showActivityIndicator: action.data,
            });
        default:
            return state;
    }
}