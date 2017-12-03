import { customerActions } from './CustomerActions';

const initialState = {
    cooks: [],
};
export function customer(state=initialState, action){
    switch(action.type){
        case customerActions.FETCH_COOKS_SUCCESSFUL:
            return Object.assign({}, state, {
                cooks: action.data,
            });
        case customerActions.ADD_TO_ORDERS_SUCCESSFUL:
            let cart = state.cart || [] 
            return Object.assign({}, state, {
                cart: cart.push(action.data),
            });
        default:
            return state
    }
}