import { orderActions } from '../Actions/OrderActions';

const initialState = {
    orders: [],
    showActivityIndicator: false
};

export default (state=initialState, action) => {
    switch(action.type){
        case orderActions.GET_ORDERS_SUCCESSFUL:
            return Object.assign({}, state, {
                orders: action.data,
            });
        case orderActions.showActivityIndicator:
            return Object.assign({}, state, {
                showActivityIndicator: action.data,
            });
        default:
            return state
    }
}