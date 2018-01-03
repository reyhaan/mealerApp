import {takeLatest} from 'redux-saga/effects';
import VendorSaga from './VendorSaga';


/******************************* ACTIONS *************************************/
export const vendorActions = {
    FETCH_MERCHANT_MENU : 'MERCHANT_MENU',
    FETCH_MENU_SUCCESSFUL : 'FETCH_MENU_SUCCESSFUL',
    CREATE_MENU : "CREATE_MENU",
    UPDATE_MENU : "UPDATE_MENU",
    REMOVE_MENU : "REMOVE_MENU",
    UPDATE_RATING: "UPDATE_RATING",
    FETCH_MERCHANT_ORDERS: "FETCH_MERCHANT_ORDERS",
    UPDATE_MERCHANT_ORDERS: "UPDATE_MERCHANT_ORDERS",
    FETCH_VENDORS : 'FETCH_VENDORS',
    UPDATE_VENDORS: 'UPDATE_VENDORS',
    SHOW_ACTIVITY_INDICATOR: 'SHOW_ACTIVITY_INDICATOR'
};

/******************************* ACTION CREATORS *************************************/
function createAction(type, data) {
    return {type, data};
}

export const vendorActionCreators = {
    fetchMerchantMenu: (data)=> createAction(vendorActions.FETCH_MERCHANT_MENU, data),
    fetchMenuSuccessful: (data)=> createAction(vendorActions.FETCH_MENU_SUCCESSFUL, data),
    createMenu: (data)=> createAction(vendorActions.CREATE_MENU, data),
    updateMenu: (data)=> createAction(vendorActions.UPDATE_MENU, data),
    removeMenu: (data)=> createAction(vendorActions.REMOVE_MENU, data),
    showActivityIndicator: (data)=> createAction(vendorActions.SHOW_ACTIVITY_INDICATOR, data),
    updateRating: (data) => createAction(vendorActions.UPDATE_RATING, data),
    fetchVendorOrders: () => createAction(vendorActions.FETCH_MERCHANT_ORDERS),
    updateMerchantOrders: (data) => createAction(vendorActions.UPDATE_MERCHANT_ORDERS, data),
    fetchVendors: ()=> createAction(vendorActions.FETCH_VENDORS),
    updateVendors: (data) => createAction(vendorActions.UPDATE_VENDORS, data),
};

/******************************* SAGA WATCHERS *************************************/
export const vendorActionWatchers = [
    takeLatest(vendorActions.FETCH_MERCHANT_MENU, VendorSaga.fetchMerchantMenu),
    takeLatest(vendorActions.CREATE_MENU, VendorSaga.createMenu),
    takeLatest(vendorActions.UPDATE_MENU, VendorSaga.updateMenu),
    takeLatest(vendorActions.REMOVE_MENU, VendorSaga.removeMenu),
    takeLatest(vendorActions.UPDATE_RATING, VendorSaga.updateRating),
    takeLatest(vendorActions.FETCH_MERCHANT_ORDERS, VendorSaga.fetchVendorOrders),
    takeLatest(vendorActions.FETCH_VENDORS, VendorSaga.fetchVendors)
];