import {authAction} from './AuthRedux';

let initialState = 0;

export default function user(state = initialState, action) {
    switch (action.type) {
        case authAction.signIn:
            console.log('signing');
            return state + 1;
        case authAction.signUp:
            console.log('signing');
            return state - 1;
        default:
            return state;
    }
}