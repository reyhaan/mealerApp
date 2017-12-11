import { orderActions } from './OrderActions';

const initialState = {
    orders: [],
};
export function order(state=initialState, action){
    switch(action.type){
        case orderActions.GET_ORDERS_SUCCESSFUL:
            return Object.assign({}, state, {
                orders: action.data,
            });
        default:
            return state
    }
}