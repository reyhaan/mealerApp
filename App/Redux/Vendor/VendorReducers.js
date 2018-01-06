import { vendorActions } from './VendorActions';

const initialState = {
    menus: [],
    vendors: [],
    showActivityIndicator: false
};
export function vendor(state=initialState, action){
    switch(action.type){
        case vendorActions.FETCH_MENU_SUCCESSFUL:
            return Object.assign({}, state, {
                menus: action.data,
            });
        case vendorActions.SHOW_ACTIVITY_INDICATOR:
            return Object.assign({}, state, {
                showActivityIndicator: action.data,
            });
        case vendorActions.UPDATE_MERCHANT_ORDERS:
            return Object.assign({}, state, {
                orders: action.data,
            });
        case vendorActions.UPDATE_VENDORS:
            return Object.assign({}, state, {
                vendors: action.data,
            });
        case vendorActions.SET_SELECTED_VENDOR:
            return Object.assign({}, state, {
                selectedVendor: action.data,
            });
        default:
            return state
    }
}