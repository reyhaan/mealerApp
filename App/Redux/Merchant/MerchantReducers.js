import { merchantActions } from './MerchantActions';

const initialState = {
    menus: []
};
export function merchant(state=initialState, action){
    switch(action.type){
        case merchantActions.FETCH_MENU_SUCCESSFUL:
            return Object.assign({}, state, {
                menus: action.data,
            });
        default:
            return state
    }
}