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
        default:
            return state
    }
}