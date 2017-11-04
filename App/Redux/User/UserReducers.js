import * as Actions from './UserActions';

let initialState = 0;

export default function user(state = initialState, action) {
    switch (action.type) {
        case Actions.SIGN_IN:
            return state + 1;
        case Actions.SIGN_UP:
            return state - 1;
        case Actions.RESET:
            return 0;
        default:
            return state;
    }
}