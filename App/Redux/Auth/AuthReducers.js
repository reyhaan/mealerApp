import {authAction} from './AuthRedux';

let initialState = {};

//Todo: Update the states properly
export default function auth(state = initialState, action) {
    switch (action.type) {
        case authAction.signInSuccessful:
            return Object.assign({}, state, {
                user: action.data,
            });
        case authAction.signUpSuccessful:
            console.log('sign up successful');
            return state;
        case authAction.signOutSuccessful:
            console.log('sign out successful');
            return state;
        default:
            return state;
    }
}