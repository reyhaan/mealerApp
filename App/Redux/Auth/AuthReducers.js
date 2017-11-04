import {authAction} from './AuthRedux';

let initialState = {};

export default function auth(state = initialState, action) {
    switch (action.type) {
        case authAction.signInSuccessful:
            console.log('sign in successful');
            return state;
        case authAction.signUpSuccessful:
            console.log('sign up successful');
            return state;
        default:
            return state;
    }
}