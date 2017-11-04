export const SIGN_IN = 'SIGN_IN';
export const SIGN_UP = 'SIGN_UP';
export const RESET = 'RESET';

export const signIn = (data) => action(SIGN_IN, data);
export const signUp = (data) => action(SIGN_UP, data);

function action(type, data) {
    return {type, data};
}