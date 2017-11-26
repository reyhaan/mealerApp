import { merchantActions } from './MerchantActions';

const initialState = {
    menus: [],
    showActivityIndicator: false
};
export function merchant(state=initialState, action){
    switch(action.type){
        case merchantActions.FETCH_MENU_SUCCESSFUL:
            return Object.assign({}, state, {
                menus: action.data,
            });
        case merchantActions.showActivityIndicator:
            return Object.assign({}, state, {
                showActivityIndicator: action.data,
            });
        default:
            return state
    }
}