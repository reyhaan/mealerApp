import {vendorActions} from './VendorActions';

const initialState = {
    menus: [],
    vendors: [],
    showActivityIndicator: false,
    orders: [],
    selectedVendor: {},
    newVendorOrders: [],
    acceptedVendorOrders: [],
    deliveredVendorOrders: [],
    cancelledVendorOrders: []
};

export default (state = initialState, action) => {
    switch (action.type) {
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
        case vendorActions.SET_NEW_VENDOR_ORDERS:
            return Object.assign({}, state, {
                newVendorOrders: action.data,
            });
        case vendorActions.SET_ACCEPTED_VENDOR_ORDERS:
            return Object.assign({}, state, {
                acceptedVendorOrders: action.data,
            });
        case vendorActions.SET_DELIVERED_VENDOR_ORDERS:
            return Object.assign({}, state, {
                deliveredVendorOrders: action.data,
            });
        case vendorActions.SET_CANCELLED_VENDOR_ORDERS:
            return Object.assign({}, state, {
                cancelledVendorOrders: action.data,
            });
        default:
            return state
    }
}