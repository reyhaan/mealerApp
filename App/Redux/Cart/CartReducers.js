import { cartActions } from './CartActions';

const initialState = {};
export function cart(state=initialState, action){
    switch(action.type){
        case cartActions.ADD_TO_CART_SUCCESSFUL:
            return Object.assign({}, state, {
                cart: action.data
            });
        case cartActions.HIDE_ADD_TO_CART_MODAL:
            return Object.assign({}, state, {
                shouldHideAddToCartModal: action.data
            });
        case cartActions.UPDATE_CART:
            return Object.assign({}, state, {
                cart: action.data
            });
        default:
            return state
    }
}