export const SIGN_IN = 'SIGN_IN';
export const SIGN_UP = 'SIGN_UP';
export const RESET = 'RESET';

export const signIn = () => action(SIGN_IN);
export const signUp = () => action(SIGN_UP);
export const reset = () => action(RESET);

function action(type, payload) {
    return {type, payload};
}