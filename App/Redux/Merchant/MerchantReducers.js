import { merchantActions } from './MerchantActions';

const initialState = [];
export function menu(state=initialState, action){
    switch(action.type){
        case merchantActions.FETCH_MENU_SUCCESSFUL:
            return action.data;
        case merchantActions.CREATE_MENU_SUCCESSFUL:
            return [...state, action.data ];
        default:
            return state
    }
}