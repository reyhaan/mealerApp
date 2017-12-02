import { cartActions } from './CartActions';

const initialState = {
    cart: [],
};
export function cart(state=initialState, action){
    switch(action.type){
        case cartActions.FETCH_COOKS_SUCCESSFUL:
            return Object.assign({}, state, {
                cart: action.data,
            });
        default:
            return state
    }
}